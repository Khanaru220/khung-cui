import FormFilter from './FormFilter';
import ControlGridLists from './../ControlGridLists';
import React, { useEffect } from 'react';
// import heroBackground from './../img/hero-background.jpg'

const PageDisplayFilms = ({
	popFilms,
	genreFilteredFilms,
	accounts,
	accountLogin,
	setAccounts,
}) => {
	// (need change) arrFitlers --> objFilters
	const [objFilters, setObjFilters] = React.useState({
		// 'friends' will be process to "render or not" in 'ControlGridList.js'
		// 'genres', 'rating' will be process 'filter' in 'RowFilm.js'
		genres: [],
		friends: [],
		since: '', //should be 'number' -- but let there and move on
	});

	useEffect(() => {
		console.log('---filters---');
		console.log(objFilters);
	}, [objFilters]);

	const setFilter = (typeFilter, arrValues) => {
		// 'typeFilter' is property of 'objFilters' read from 'data-typeFilter' in <FormFilter></FormFilter>
		// update === copy + overwrite ---> create new version
		setObjFilters({ ...objFilters, [typeFilter]: arrValues });
	};

	return (
		<>
			<FormFilter
				objFilters={objFilters}
				setFilter={setFilter}
				accountLogin={accountLogin}
				accounts={accounts}
			/>
			<ControlGridLists
				popFilms={popFilms}
				genreFilteredFilms={genreFilteredFilms}
				objFilters={objFilters}
				accounts={accounts}
				setAccounts={setAccounts}
				accountLogin={accountLogin}
			/>
		</>
	);
};

export default PageDisplayFilms;
