import RowFilms from './RowFilms';

const ControlGridLists = ({
	popFilms,
	objFilters,
	accounts, //to find 'arrFriendFilms'
	accountLogin,
	setAccounts,
}) => {
	// ------------------ FRIENDLIST --------
	// (1) allFriendsList --> save name and display on <FormFilter> as 'option'
	// (2) checked <option> --> update to 'obj.Filters.friends'
	// (3) 'obj.Filters.friends' --> pass to this component and process
	let arrAllFriendsLists;
	if (objFilters.friends?.length > 0) {
		console.log('----objFilters');
		console.log(objFilters);
		arrAllFriendsLists = objFilters.friends?.map((friend, i) => {
			// lookup 'friend' --> 'accounts' --> 'acc' --> 'likedFilms'
			const accFriend = accounts.find((acc) => acc.username === friend);
			return (
				<RowFilms
					accounts={accounts}
					accountLogin={accountLogin}
					setAccounts={setAccounts}
					key={i}
					titleList={`${accFriend.name}'s list`}
					arrFilms={accFriend.likedFilms}
					objFilters={objFilters}
				/>
			);
		});
	}
	// ----------------- FRIENDLSIT (end) --------

	// ----------------- MY LSIT --------
	const myFilmSection = (
		<RowFilms
			accounts={accounts}
			accountLogin={accountLogin}
			setAccounts={setAccounts}
			isMyList={true}
			titleList="💜 Your favourites"
			arrFilms={accountLogin.likedFilms}
			objFilters={objFilters}
		/>
	);

	// ----------------- MY LSIT (end) --------

	return (
		<>
			{/*0. my list on top*/}
			{myFilmSection}
			{/*1. default list*/}
			<RowFilms
				accounts={accounts}
				accountLogin={accountLogin}
				setAccounts={setAccounts}
				titleList="Popular"
				arrFilms={popFilms}
				objFilters={objFilters}
			/>
			{/*2. conditional list -- Friend's list*/}
			{arrAllFriendsLists ? (
				arrAllFriendsLists
			) : (
				<div className="noFriendBox">
					check in&nbsp;&nbsp;&nbsp;<u>FILTER</u>
					&nbsp;&nbsp;&nbsp; to see your &nbsp; &nbsp;&nbsp;
					<u>friends' FAVOURITE</u>&nbsp;shows
				</div>
			)}
		</>
	);
};

export default ControlGridLists;
