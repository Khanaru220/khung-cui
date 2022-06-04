class Acc {
	constructor({ username, password, country,name }) {
		// 3 input from Sign-up form
		this.username = username;
		this.password = password;
		this._country = country;
		this.name=name;

		// base on current total number of 'accounts'
		this.id = Math.round(Math.random() * 10000) + 1;
		// (later) 'likedFilms' will auto generated 5 films base on 'country'
		this.friends = []; //hard code from 'initial_5Acc.js'
	}
	// setter
	set _country(country) {
		let filmHolder = [];
		// temporary -- i need find a way to store 'fetch data' to a varible/property
		const fetchAPIFilmsCountry_3 = async () => {
			await fetch(`https://api.tvmaze.com/search/shows?q=${country}`, {
				method: 'GET',
			})
				.then((response) => response.json())
				.then((data) => {
					const showsHasImage = data.filter((showObj) => showObj.show.image);
					const randomNumStart = Math.round(
						Math.random() * (showsHasImage.length - 3)
					);
					filmHolder = filmHolder.concat(
						showsHasImage
							.slice(randomNumStart, randomNumStart + 3)
							.map((obj) => obj.show)
					); // (!) this API 'search' different format
				}); // take 3 films
		};
		const fetchAPIFilmsRandom_10 = async () => {
			await fetch(
				`https://api.tvmaze.com/shows?page=${Math.round(Math.random() * 100)}`,
				{ method: 'GET' }
			)
				.then((response) => response.json())
				.then((data) => (filmHolder = filmHolder.concat(data.slice(0, 10)))); // take 10 films --- enough to apply 'filter'
			this.likedFilms = filmHolder; // assign after 2 function run
		};
		// .then() because there some case 'country film not fetch yet' and mysterious bypass -.-
		fetchAPIFilmsCountry_3().then(() => fetchAPIFilmsRandom_10());

		this.country = country;
	}
}

const GenerateAcc = ({ username, password, country,name }) => {
	return new Acc({ username, password, country,name });
};

export default GenerateAcc;
