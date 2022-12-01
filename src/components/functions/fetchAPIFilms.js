import generateNonrepeatNumbers from './helper/generateNonrepeatNumbers';
import isNumberLike from './helper/isNumberLike';
/**
 * @description handle different endpoints based on arguments + recursive requests as needed
 * @param {number} satisfiedQuantity - stop request after reach this point
 * @param {string} genre - decide url, data to fetch relevant ['undefine', genre, country]
 */
const fetchAPIFilms = async (
	{ satisfiedQuantity = 10, genre, country } = {},
	option
) => {
	// (!) temporary: idea of 'option' is to prevent conflict when both 'genre' + 'country'
	if (!isNumberLike(satisfiedQuantity)) {
		// (?) is throw Error better? i suppose it crash app, stop user interaction
		console.error(
			`Error validate: 'satisfiedQuantity' is not a number-like | default: don't fetch`
		);
		return;
	}

	let filmHolder = [];
	const maxPage = 260;
	let countReq = 0;
	const maxReq = 10;
	// not waste any requests
	const nonRepeatPages = generateNonrepeatNumbers(maxReq, 0, maxPage);

	/**
	 * recursive function for fetching film
	 */
	const fetchAndUpdateFilmHolderFragment = async () => {
		// put url here for update each recursive
		let url = `https://api.tvmaze.com/shows?page=${nonRepeatPages[countReq]}`;
		if (option === 'country') {
			if (country) {
				// (TODO) handle case repeat request (not reach satisfiedQuantity) with same url -> duplicate data
				url = `https://api.tvmaze.com/search/shows?q=${country}`;
			} else {
				console.error(`Error validate: 'country' property is required`);
			}
		}

		if (filmHolder.length < satisfiedQuantity && countReq < maxReq) {
			const res = await fetch(url);
			let films = await res.json();

			// (!) need a solution to separate this multi-option + able to trigger recursive
			if (option === 'genre') {
				if (genre) {
					// (TODO) validate more cases about 'genre' string
					films = films.filter((film) =>
						film.genres.some((gen) => gen.toLowerCase() === genre.toLowerCase())
					);
				} else {
					console.error(`Error validate: 'genre' property is required`);
				}
			} else if (option === 'country') {
				if (country) {
					films = films.map((el) => el.show);
				} else {
					// (!) duplicate from the top: to remind add when update later
					console.error(`Error validate: 'country' is required`);
				}
			}

			filmHolder = filmHolder.concat(films);

			countReq++;
			// return another Promise to not let settle. Continue call
			return fetchAndUpdateFilmHolderFragment();
		}
	};
	await fetchAndUpdateFilmHolderFragment();
	return filmHolder;
};
export default fetchAPIFilms;
