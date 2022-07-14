const fetchAPIFilms = async (numberFilms = 100) => {
	// Random:  (0-100 pages)  + (100 first index)
	//--- do this in local varaible to limit only 1 call API, instead call each time for different 'id'
	const data = await fetch(
		`https://api.tvmaze.com/shows?page=${Math.round(Math.random() * 200)}`, // I want it more Random pages for each call, for more category -- (?) does it neccesary
		{ method: 'GET' }
	); // (?) don't know what .json() do --> because 'response' doesnt seem like a contain any data

	const films = await data.json();

	// if 'films from API' smaller than our 'argu' ==> just take enough films fro API
	numberFilms = films.length < numberFilms ? films.length : numberFilms;

	return films.slice(0, numberFilms); // temporary solution -- .slice(shalow copy)
};

export default fetchAPIFilms;
