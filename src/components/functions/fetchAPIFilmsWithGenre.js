import toCapitalizeFirstLetter from './toCapitalizeFirstLetter';

const fetchAPIFilmsWithGenre = async (numberFilms = 10, genre) => {
	// 1. films holder
	let films = [];

	// 2. fetching a new page until film-holder enough numberFilms
	let randomPage = Math.round(Math.random() * 200); // 200 is near end from tv.maze

	while (films.length < numberFilms) {
		const data = await fetch(
			`https://api.tvmaze.com/shows?page=${randomPage}`, // I want it more Random pages for each call, for more category -- (?) does it neccesary
			{ method: 'GET' }
		); // (?) don't know what .json() do --> because 'response' doesnt seem like a contain any data

		const fetchedFilms = await data.json();
		const filteredFilms = fetchedFilms.filter((film) =>
			film.genres.includes(toCapitalizeFirstLetter(genre))
		);
		films = films.concat(filteredFilms);

		// update randomPage to fetching next new page
		randomPage = randomPage === 200 ? 0 : randomPage + 1;
	}

	// 3. trimming some films to enough numberFilms
	return films.slice(0, numberFilms);
};

export default fetchAPIFilmsWithGenre;
