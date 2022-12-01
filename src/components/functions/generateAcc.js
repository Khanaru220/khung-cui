import generateNonrepeatNumbers from './helper/generateNonrepeatNumbers';
import fetchAPIFilms from './fetchAPIFilms';

class Acc {
	constructor({ username, password, country, name }) {
		this.username = username;
		this.password = password;
		this.name = name;
		this._country = country;

		this.id = Math.ceil(Math.random() * 100000);
		this.friends = [];
		this.likedFilms = [];
	}
	// setter
	set _country(country) {
		// trigger, when user add 'country'

		// ensure, setter wait until fetching finish
		// (?) is there a way make 'setter' become async -> A: need trick
		const fetchAndUpdateLikedFilms = async () => {
			const quantityOfCountryFilms = 3;
			const quantityOfBufferFilms = 11;
			const [countryFilms, bufferFilms] = await Promise.all([
				fetchAPIFilms({ satisfiedQuantity: 5, country }, 'country'),
				fetchAPIFilms(),
			]);
			// (TODO) create module for hasOnlyImage shows

			[quantityOfCountryFilms, quantityOfBufferFilms].forEach((quantity, i) => {
				const films = i === 0 ? countryFilms : bufferFilms;
				// pick film random then add to likedFilms
				generateNonrepeatNumbers(quantity, 0, films.length - 1).forEach(
					(indexFilm) => this.likedFilms.push(films[indexFilm])
				);
			});
		};

		fetchAndUpdateLikedFilms();
		this.country = country;
	}
}

const GenerateAcc = ({ username, password, country, name }) => {
	return new Acc({ username, password, country, name });
};

export default GenerateAcc;
