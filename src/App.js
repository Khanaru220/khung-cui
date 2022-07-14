import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { logo, mp3, heroVideos, heroSmallVideos } from './components/img/index';

// import ControlGridLists from './components/ControlGridLists';
import React, { useEffect } from 'react';
import FormAccount from './components/AccountPage/FormAccount';

// import Button from './components/Button';
import Initial_5Acc from './components/initial/Initial_5Acc';
import generateAcc from './components/functions/generateAcc';
import fetchAPIFilms from './components/functions/fetchAPIFilms';
import checkFlexGap from './components/functions/checkFlexGap';
import PageDisplayFilms from './components/DisplayPage/PageDisplayFilms';
import FriendAddField from './components/DisplayPage/FriendAddField';

import fetchAPIFilmsWithGenre from './components/functions/fetchAPIFilmsWithGenre';

function App() {
	const [indexHeroVideo, setIndexHeroVideo] = React.useState(0);
	const [accountLogin, setAccountLogin] = React.useState(null); // for 'navigate' + 'display my-list, friends'
	const [accounts, setAccounts] = React.useState(() => Initial_5Acc());
	const [genreFilteredFilms, setGenreFilteredFilms] = React.useState([]);
	const [popFilms, setPopFilms] = React.useState([]); // (?) do it need use 'state' here, because i just want store 'films' to local only one, and don't mutate it
	// (!) temporary solution = i need a way to 'store fetch data' in to 'state'
	// (?) need research why 'lazy intializer' can solve this problem
	// (!) 'state' popFilms is unnessary when we're in 'Login page'

	useEffect(() => {
		// trigger when ever login success
		// fetching when 'null' --> first visit + fetch before user 'login'
		if (accountLogin) return;

		const fetchFilms = async () => {
			const genreFilms = await fetchAPIFilmsWithGenre(20, 'anime');
			const popFilms = await fetchAPIFilms(50);

			setGenreFilteredFilms(genreFilms);
			setPopFilms(popFilms);
		};

		fetchFilms();

		console.log('Films are ready');
	}, [accountLogin]);

	// useEffect(() => {
	// 	// display 'accounts' once
	// 	// and when register, login success
	// 	console.log('----accounts');
	// 	console.log(accounts);
	// }, [accounts, accountLogin]);

	// (?) i don't know should write 'function' inside or outside component
	// ---> i want write outside to see it more clean, but 'state' declare inside
	// ---> (?) can I make it look cleaner
	// those 2 method just pops up in mind --- more clean when pass 'manageAccounts' between component, rather than create new separatae Componets
	const doSignup = ({ username, password, country }) => {
		// check if 'username' is unique
		if (accounts.some((acc) => acc.username === username)) {
			alert(`🔴 Your USERNAME was taken. Please try another one.`);
		} else {
			// create new acc
			setAccounts([...accounts, generateAcc({ username, password, country })]);
			alert(`🎉 Congrate! 
    Your account "${username}" is ready to use.`);
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
			alert(`🟢 Welcome back, ${username}`);
			setAccountLogin(acc);
		} else {
			alert('🔴 Wrong PASSWORD. Please try again.');
		}
	};

	React.useEffect(() => {
		checkFlexGap();
	});

	// (?) I need add a 'wait point' here, just pass data 'arrFilms' after it is updated
	// @@ urgly solution, wait 'fecthing data' === separate 2 cases of (Promise/object films)

	if (popFilms.length > 1 && accounts.length > 1) {
		return (
			<BrowserRouter>
				<div className={'nav-bar'}>
					<img src={logo} alt="Logo of Khung cửi -- a cloth pattern" />
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
						{/* navigate to /cinema if accountLogin exist === login success */}
						{/* (!) bad repeat-- build a redirect cases bases on 'accountLogin' -- need a better system build a 'net' of relationsihp */}
						{/* really powerful <Navigate> i dont need to write another function to navigate or <a href=""></a> */}
						{/* (?) wait what differences between useNavigate, navigate JS, <<Navigate> componenet  */}
						<Route
							path="/"
							element={
								// navigate to Signup -- because if user already member, they will use 'remember me' instead
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
									// <Form
									// 	doSignup={doSignup}
									// 	doLogin={doLogin}
									// 	accountLogin={accountLogin}
									// />
								)
							}
						/>

						<Route
							// (1) I need generate this <Route> to be able to navigate to
							// (2) but I have to duplicate from '/login'
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
												indexHeroVideo !== 0 ? 'hero--crop_vertical' : ''
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
								</video>`,
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
			// display while "fetching" --- (upgrade this), find a way to 'add timer'
			<p style={{ fontSize: '20px', marginLeft: '50px' }}>
				We're trying get to you soon.
				<br />
				The traffic isn't great right now 🚜....
			</p>
		);
	}
}

export default App;
