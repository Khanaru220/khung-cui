import FormFilter from './FormFilter';
import ControlGridLists from './../ControlGridLists';
import React from 'react';
// import heroBackground from './../img/hero-background.jpg'

const PageDisplayFilms = ({ popFilms, accounts, accountLogin,setAccounts }) => {
	// (need change) arrFitlers --> objFilters
	const [objFitlers, setObjFitlers] = React.useState({
		// 'friends' will be process to "render or not" in 'ControlGridList.js'
		// 'genres', 'rating' will be process 'filter' in 'RowFilm.js'
		genres: [],
		friends: [],
		since: 0, //should be 'number' -- but let there and move on
	});

	const setFilter = (typeFilter, arrValues) => {
		// 'typeFilter' is property of 'objFilters' read from 'data-typeFilter' in <FormFilter></FormFilter>
		// update === copy + overwrite ---> create new version
		setObjFitlers({ ...objFitlers, [typeFilter]: arrValues });
	};

	return (
		<>
			<FormFilter
				objFitlers={objFitlers}
				setFilter={setFilter}
				accountLogin={accountLogin}
				accounts={accounts}
			/>
			<ControlGridLists
				popFilms={popFilms}
				objFilters={objFitlers}
				accounts={accounts}
				setAccounts={setAccounts}
				accountLogin={accountLogin}
			/>
		</>
	);
};

export default PageDisplayFilms;
