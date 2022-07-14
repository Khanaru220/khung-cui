import generateRandomRangeNumber from './generateRandomRangeNumber';

class Acc {
	constructor({ username, password, country, name }) {
		// 3 input from Sign-up form
		this.username = username;
		this.password = password;
		this._country = country;
		this.name = name;

		// base on current total number of 'accounts'
		this.id = Math.round(Math.random() * 10000) + 1;
		// (later) 'likedFilms' will auto generated 5 films base on 'country'
		this.friends = []; //hard code from 'initial_5Acc.js'
	}
	// setter
	set _country(country) {
		// trigger, when user add 'country'
		let filmHolder = [];
		// temporary -- i need find a way to store 'fetch data' to a varible/property

		const fetchAPIFilmsCountry_3 = async () => {
			const data = await fetch(
				`https://api.tvmaze.com/search/shows?q=${country}`,
				{
					method: 'GET',
				}
			);
			const shows = await data.json();

			const showsHasImage = shows.filter((showObj) => showObj.show.image);
			// const randomNumStart = Math.round(
			// 	Math.random() * (showsHasImage.length - 3)
			// );

			// take 3 films (smaller if not enough 3)
			const quantityFilms =
				showsHasImage.length >= 2 ? 3 : showsHasImage.length;
			generateRandomRangeNumber(
				quantityFilms,
				0,
				showsHasImage.length - 1
			).forEach((num) => filmHolder.push(showsHasImage[num].show));
			// (!) API 'search' need read property 'show' to access detail
		};

		const fetchAPIFilmsRandom_10 = async () => {
			const data = await fetch(
				`https://api.tvmaze.com/shows?page=${Math.round(Math.random() * 200)}`,
				{ method: 'GET' }
			);
			const shows = await data.json();

			const quantityFilms = 10;
			generateRandomRangeNumber(quantityFilms, 0, shows.length - 1).forEach(
				(num) => filmHolder.push(shows[num])
			);

			this.likedFilms = filmHolder; // assign after 2 function run
		};

		// ensure, setter wait until fetching finish
		// (?) maybe "async" function when declare, will perfom async when call it
		// (?) or need a way to make 'getter' become async -- need trick
		const fetchFilms = async () => {
			await fetchAPIFilmsCountry_3();
			await fetchAPIFilmsRandom_10();
		};
		fetchFilms();

		this.country = country;
	}
}

const GenerateAcc = ({ username, password, country, name }) => {
	return new Acc({ username, password, country, name });
};

export default GenerateAcc;
