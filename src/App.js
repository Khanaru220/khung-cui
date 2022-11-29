import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import FormAccount from './components/AccountPage/FormAccount';
import FriendAddField from './components/DisplayPage/FriendAddField';
import PageDisplayFilms from './components/DisplayPage/PageDisplayFilms';
import createInitialAccs from './components/functions/createInitialAccs';
import fetchAPIFilms from './components/functions/fetchAPIFilms';
import generateAcc from './components/functions/generateAcc';
import getGenres from './components/functions/helper/getGenres';

import './App.css';
import { heroSmallVideos, heroVideos, logo, mp3 } from './components/img/index';

function App() {
	const [indexHeroVideo, setIndexHeroVideo] = React.useState(0);
	const [accountLogin, setAccountLogin] = React.useState(null); // for 'navigate' + 'display my-list, friends'
	const [accounts, setAccounts] = React.useState(() => createInitialAccs());
	const [genreFilteredFilms, setGenreFilteredFilms] = React.useState({});
	const [popFilms, setPopFilms] = React.useState([]); // (?) do it need use 'state' here, because i just want store 'films' to local only one, and don't mutate it
	// (TODO) temporary solution = i need another way to 'store fetch data' in to 'state'
	// (?) why 'lazy intializer' can solve this problem
	// (!) 'state' popFilms is unnessary when we're in 'Login page'

	useEffect(() => {
		// fetching after login --> make first visit faster
		const fetchGenreFilms = async (...genres) => {
			const objGenreFilms = {};

			for (const genre of genres) {
				objGenreFilms[genre] = await fetchAPIFilmsWithGenre(10, genre);
			}

			setGenreFilteredFilms(objGenreFilms);
		};

		const fetchPopFilms = async () => {
			const popFilms = await fetchAPIFilms(30);
			setPopFilms(popFilms);
		};

		const fetchFilms = async () => {
			// (in loginPage) fetch popFilms - user login smooth, have thing to see first
			if (!accountLogin) {
				await fetchPopFilms();
				console.log('[Popular films] are ready');
			} else {
				// (after login) fetch genresFilms - need times
				// (?) better, display 'Loading section' (Just for row, not whole page. Otherwise, it prevent login smooth feeling)
				await fetchGenreFilms('anime', 'music', 'crime', 'travel'); // (TODO) i don't hanlde the invalid-genre yet
				console.log('[Genres films] are ready');
			}
		};
		fetchFilms();
	}, [accountLogin]);

	// display 'accounts' when register success = keep track.length
	// (not run while change other property: likeFilms,...)
	// useRef(initla value) is a special variable --> store data in obj.current --> not re-computed when re-render, only change by re-asign
	const prevNumberAccounts = useRef(0);
	useEffect(() => {
		if (prevNumberAccounts.current !== accounts.length) {
			if (prevNumberAccounts.current === 0) {
				console.log('👋 Hi there. Check accounts detail---', accounts);
			} else {
				console.log('[Users] changed---', accounts);
			}

			prevNumberAccounts.current = accounts.length;
		}
		// (!) there a thing call "lie to React": (i rephrase not sure) the state we use in effect must exist in depency array
		// (e.g) to console.log(accounts) -> we have to put accounts to dependency --> maybe React know which variable is 'state'
	}, [accounts]); // great, i can listen to specific property instead whole state
	// (?) Should I write 'function' inside or outside component
	// -> i want write outside to see it more clean, but 'state' declare inside
	// -> (?) can I make it look cleaner
	// those 2 method just pops up in mind --- more clean when pass 'manageAccounts' between component, rather than create new separatae Componets
	const doSignup = ({ username, password, country }) => {
		// check if 'username' is unique
		if (accounts.some((acc) => acc.username === username)) {
			alert(`🔴 Your USERNAME was taken. Please try another one.`);
		} else {
			setAccounts([...accounts, generateAcc({ username, password, country })]);
			alert(`🎉 Congrate! Your account "${username}" is ready to use.`);
		}
	};

	const doLogin = ({ username, password }) => {
		// matching 'username' in 'accounts'
		const acc = accounts.find((acc) => acc.username === username);
		if (!acc) {
			alert(
				`🔴 Your account doesn't exist.
  Please double-check USERNAME if you has created account.`
			);
		} else if (acc.password === password) {
			alert(`🧶 Welcome back, ${username}`);
			setAccountLogin(acc);
		} else {
			alert('🔴 Wrong PASSWORD. Please try again.');
		}
	};

	// (TODO) I need add a 'wait point' here, just pass data 'arrFilms' after it is updated
	// (!) @@ urgly solution, wait 'fecthing data' === separate 2 cases of (Promise/object films)

	// visit website: wait until fetch video to 'initalAccounts' success
	if (accounts.length > 1) {
		return (
			<BrowserRouter>
				<div className={'nav-bar'}>
					<a href="#body" className="nav-bar_logo-wrapper">
						<img src={logo} alt="Logo of Khung cửi -- a cloth pattern" />
					</a>
					<h1 onClick={() => new Audio(mp3).play()}>Khung Cửi</h1>

					{accountLogin?.username ? (
						<p>
							Hi, <strong>{accountLogin.username}</strong>
						</p>
					) : (
						''
					)}
				</div>

				<Routes>
					<>
						{/* navigate to '/cinema' if accountLogin exist === login success */}
						{/* (!) bad repeat: build a redirect cases bases on accountLogin -- need a better system build a 'net' of relationsihp */}
						{/* really powerful <Navigate> i dont need to write another function to navigate or <a href=""></a> */}
						{/* (?) what differences between useNavigate, navigate JS, <<Navigate> componenet  */}
						<Route
							path="/"
							element={
								// navigate to 'Signup' -- because if user already member, they will use 'remember me' instead
								<Navigate
									to={`/${accountLogin ? 'cinema' : 'signup'}`}
								></Navigate>
							}
						/>

						<Route
							path="/login"
							element={
								accountLogin ? (
									<Navigate to="/cinema"></Navigate>
								) : (
									<>
										{document.body.classList.remove('background-dark')}
										<FormAccount
											doSignup={doSignup}
											doLogin={doLogin}
											accountLogin={accountLogin}
										/>
									</>
								)
							}
						/>

						<Route
							// (1) I need generate this <Route> to be able to navigate to
							// (!) (2)  but I have to duplicate from '/login'
							path="/signup"
							element={
								accountLogin ? (
									<Navigate to="/cinema"></Navigate>
								) : (
									<>
										{document.body.classList.remove('background-dark')}

										<FormAccount
											doSignup={doSignup}
											doLogin={doLogin}
											accountLogin={accountLogin}
										/>
									</>
								)
							}
						/>

						<Route
							path="/cinema"
							element={
								// after login: wait until popFilms fetching - if not, user see nothing and don't know what to do
								accountLogin ? (
									<>
										{/* because policy in Safari only allow autoplay if: mute + fullscreen */}
										{/* (mute) (!) issue: React doesn't write 'muted' attribute in DOM */}
										{/* (mute) dangerouslySetInnerHTML work like innerHTML */}
										{/* (fullscreen) use attribute 'playinsline' - allow autoplay withou fullscreen */}

										<div
											// video_0: default
											// video_1,2: crop vertical to center
											className={`hero ${
												indexHeroVideo !== 1 ? 'hero--crop_vertical' : ''
											}`}
											id="vid"
											onClick={() => {
												setIndexHeroVideo(
													indexHeroVideo === heroVideos.length - 1
														? 0
														: indexHeroVideo + 1
												);
											}}
											dangerouslySetInnerHTML={{
												__html: `
										<video 
										autoplay 
										loop
										muted
										playsinline
										>
										<source src=${
											window.innerWidth <= 480
												? heroSmallVideos[indexHeroVideo]
												: heroVideos[indexHeroVideo]
										} type="video/mp4"/>
									Your browser does not support the video tag.
								</video>
								<p class="hero-guide_box">
												<b>↑</b> click me
											</p>
								`,
											}}
										/>

										{/* 'media' fro response video-src attribute no longer support */}
										{/* hack to enable dark-background */}
										{document.body.classList.add('background-dark')}
										<div>
											<button onClick={() => setAccountLogin(null)}>
												Sign out
											</button>
											<FriendAddField
												accounts={accounts}
												accountLogin={accountLogin}
												setAccounts={setAccounts}
											/>
											<PageDisplayFilms
												popFilms={popFilms}
												genreFilteredFilms={genreFilteredFilms}
												accountLogin={accountLogin}
												accounts={accounts}
												setAccounts={setAccounts}
											/>
										</div>
									</>
								) : (
									<Navigate to="/signup"></Navigate>
								)
							}
						></Route>
					</>
				</Routes>
			</BrowserRouter>
		);
	} else {
		return (
			// display when visit login page while "fetching"
			// (TODO) upgrade: find a way to 'add timer'
			<p style={{ fontSize: '20px', marginLeft: '50px' }}>
				We're trying get to you soon.
				<br />
				The traffic isn't great right now 🚜....
			</p>
		);
	}
}

export default App;
