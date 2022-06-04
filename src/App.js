import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import logo from './components/img/khung-cui-logo.png'
import mp3 from './components/img/khung-cui-pronounce.mp3'
// import heroBackground from './components/img/wallpaperflare.com_wallpaper.jpg'
import heroBackground from './components/img/cropped-1920-1200-719056.jpg'


// import ControlGridLists from './components/ControlGridLists';
import React from 'react';
import FormAccount from './components/AccountPage/FormAccount';
// import Button from './components/Button';
import Initial_5Acc from './components/initial/Initial_5Acc';
import generateAcc from './components/functions/generateAcc';
import fetchAPIFilms from './components/functions/fetchAPIFilms';
import PageDisplayFilms from './components/DisplayPage/PageDisplayFilms';
import FriendAddField from './components/DisplayPage/FriendAddField'

function App() {
	const [accountLogin, setAccountLogin] = React.useState(null); // for 'navigate' + 'display my-list, friends'
	const [accounts, setAccounts] = React.useState(() => Initial_5Acc());
	const [popFilms, setPopFilms] = React.useState(() =>
		fetchAPIFilms(50).then((data) => setPopFilms(data))
	); // (?) do it need use 'state' here, because i just want store 'films' to local only one, and don't mutate it
	// (!) temporary solution = i need a way to 'store fetch data' in to 'state'
	// (?) need research why 'lazy intializer' can solve this problem
	// (!) 'state' popFilms is unnessary when we're in 'Login page'

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
	console.log('----accounts');
	console.log(accounts);

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

	// (?) I need add a 'wait point' here, just pass data 'arrFilms' after it is updated
	// @@ urgly solution, wait 'fecthing data' === separate 2 cases of (Promise/object films)

	if (popFilms.length > 1 && accounts.length > 1) {
		return (
			<BrowserRouter>
					<div className={"nav-bar"}>
						<img src={logo} alt="Logo of Khung cửi -- a cloth pattern"/>
						<h1 onClick={()=> new Audio(mp3).play()}>Khung Cửi</h1>

						{accountLogin?.username ? <p>Hi, <strong>{accountLogin.username}</strong></p> :''}

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
										{/* hack to enable dark-background */}
										{document.body.classList.add('background-dark')}
									<div>
										<button onClick={() => setAccountLogin(null)}>
											Sign out
										</button>
										<FriendAddField accounts={accounts}
										accountLogin={accountLogin}
										setAccounts={setAccounts} />
										<PageDisplayFilms
											popFilms={popFilms}
											accountLogin={accountLogin}
											accounts={accounts}
											setAccounts={setAccounts}
										/>
									</div>
										<div className="hero">
												<img src={heroBackground} alt={`a cover image of series "Game of Thrones"`}/>
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
			<p style={{fontSize:'20px', marginLeft:"50px"}}>
				We're trying get to you soon.
				<br />
				The traffic isn't great right now 🚜....
			</p>

		);
	}
}

export default App;
