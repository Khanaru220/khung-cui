import generateNonrepeatNumbers from './generateNonrepeatNumbers';
import isNumberLike from './isNumberLike';
import toCapitalizeFirstLetter from './toCapitalizeFirstLetter';
/**
 *1. handle different endpoints based on arguments
 * 2. recursive requests as needed
 * @param {number} satisfiedQuantity - stop request after reach this point
 */
const fetchAPIFilms = async (
	{ satisfiedQuantity, genre } = { satisfiedQuantity: 20 }
) => {
	if (!isNumberLike(satisfiedQuantity)) return;

	let filmHolder = [];
	const maxPage = 260;
	let countReq = 0;
	const maxReq = 10;
	// not waste any requests
	const randPages = generateNonrepeatNumbers(maxReq, 0, maxPage);

	/**
	 * recursive function for fetching film
	 */
	const fetchFragment = async () => {
		if (filmHolder.length < satisfiedQuantity && countReq < 30) {
			let url = `https://api.tvmaze.com/shows?page=${randPages[countReq]}`;
			const res = await fetch(url);
			let films = await res.json();

			if (genre) {
				films = films.filter((film) =>
					film.genres.includes(toCapitalizeFirstLetter(genre))
				);
			}
			filmHolder = filmHolder.concat(films);

			countReq++;
			// return another Promise to not let settle. Continue call
			return fetchFragment();
		}
	};

	await fetchFragment();
	/* (TODO) handle `https://api.tvmaze.com/search/shows?q=${country}`
  maybe conflict with 'genere'
  */
	return filmHolder;
};
export default fetchAPIFilms;
