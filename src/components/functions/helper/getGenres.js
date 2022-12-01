import isNumberLike from './isNumberLike';
import generateNonrepeatNumbers from './generateNonrepeatNumbers';
// (?) didn't know better way to store simple data without messy main page
const getGenres = (numberOfGenres) => {
	let genres = [
		'Nature',
		'Travel',
		'Comedy',
		'Adventure',
		'Anime',
		'Fantasy',
		'Drama',
		'Romance',
		'Science-Fiction',
		'Action',
		'History',
		'Sports',
		'Children',
		'Supernatural',
		'Mystery',
		'Medical',
		'Crime',
		'Thriller',
		'Food',
		'Legal',
		'Music',
		'Horror',
		'Family',
		'DIY',
		'Western',
		'War',
	];
	if (isNumberLike(numberOfGenres)) {
		genres = generateNonrepeatNumbers(numberOfGenres, 0, genres.length - 1).map(
			(i) => genres[i]
		);
	} else {
		console.warn(
			`Error validate: 'numberOfGenres' is not a number-like | default: get all genres`
		);
	}
	return genres;
};

export default getGenres;
