import notFoundBackground from './img/not-found-poster.jpg';

const RowFilms = ({
	isMyList = false,
	titleList,
	arrFilms,
	objFilters,
	setAccounts,
	accounts,
	accountLogin,
}) => {
	// (!) hard to change property, element deeper level with this 'copy' technique
	const copiedAccounts = [...accounts];

	const addFilm = (id) => {
		// (i suppose it will work base on 'somehow' the 'eventhandler' remember exactly 'arrFilms' when creat)
		const filmSelected = arrFilms.find((film) => film.id === Number(id));
		// bad solution -- remove dubplicate friends username
		copiedAccounts[copiedAccounts.indexOf(accountLogin)].likedFilms = [
			...new Set([filmSelected, ...accountLogin.likedFilms]),
		];
		setAccounts(copiedAccounts);
	};

	const removeFilm = (id) => {
		const filmSelected = arrFilms.find((film) => film.id === Number(id));
		const copiedLikedFilms = accountLogin.likedFilms;
		copiedLikedFilms.splice(copiedLikedFilms.indexOf(filmSelected), 1); //delete it in array
		copiedAccounts[copiedAccounts.indexOf(accountLogin)].likedFilms =
			copiedLikedFilms;
		setAccounts(copiedAccounts);
	};
	// titleList: e.g My List, Popular
	// size of card-film -- fixed width + height (rectangular)
	// over-flow: auto -- work better than "scroll"

	// (?) need somehow to keeptrack 'arrFilter' when it change --- will re-run below logic again
	// if 'objFilters' 'exist' === toggle ON, assign 'filteredArrFilms'
	// if (not) bypass this block code and display 'arrFilms' as defauly
	let filteredArrFilms;
	// only generate if 'generes' is selected
	// (!) we're running this loop for each 'rowFilms'

	// (1) if apply filter --> generate 'filteredArrFilms'
	if (objFilters.since > 0 || objFilters.genres?.length > 0) {
		filteredArrFilms = arrFilms.slice(); // create copy
	}

	if (filteredArrFilms) {
		// (2) filter 'genres'
		if (objFilters.genres?.length > 0) {
			// run loop, with each 'filter' we'll elimnate the non-suitable optiosn ==> final result will has only what meets all 'filter'
			for (let genre of objFilters.genres) {
				filteredArrFilms = filteredArrFilms.filter((film) => {
					return film.genres.includes(genre); // @@ it also check capitalize ["Adventure","Romance"]
				});
			}
		}

		// (3) filter 'since' --- need better solution to chain this process

		if (objFilters.since > 0) {
			filteredArrFilms = filteredArrFilms.filter((film) => {
				// regex: "2014-2-3" -- take year
				const premieredYear = Number(film.premiered?.match(/^\d*[^-]/s)[0]); // mathch return array
				// some film doesn't have 'premired data' ==> don't return
				// (1) I think old films occur that
				// (2) but we want use 'since' to see modern film ==> return false when not have result
				if (!premieredYear) return false;
				return premieredYear > objFilters.since; // @@ it also check capitalize ["Adventure","Romance"]
			});
		}
	}

	const filmsDisplay = filteredArrFilms ? filteredArrFilms : arrFilms; // make this variable to decide which 'array' to display

	let arrElementFilmSections = []; // bad solution -- if 'filmsDisplay' is 0, not generate anytthings
	if (filmsDisplay?.length > 0) {
		arrElementFilmSections = [...Array(filmsDisplay.length)].map((_, i) => {
			/* can't use 'for' here -- it's statement, we need .map to return expression*/
			/* when see 'array' -- JSX will help us generate multiple*/
			/*trick transform 'empty Array' --> 'undefediend Array' --- so we can loop over*/
			/* arrFilms.length === cards generated */

			// load poster quality based screen width
			const posterImgURL =
				window.innerWidth >= 780
					? filmsDisplay[i].image?.original
					: filmsDisplay[i].image?.medium; // some film- not have poster
			const nameFilm = filmsDisplay[i].name;
			return (
				// background-image: based on "posterImgURL" --> if (false) use default img from local
				<div className="filmCardContainer" key={i}>
					<div
						data-id={filmsDisplay[i].id}
						className="filmCard"
						style={{
							backgroundImage: `url(${
								posterImgURL ? posterImgURL : notFoundBackground
							})`,
						}}
					>
						<div className="filmNameContainer">
							{nameFilm}
							{isMyList ? (
								<svg
									className="remove-film h-6 w-6"
									onClick={(e) => {
										removeFilm(e.target.closest('.filmCard').dataset.id);
									}}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							) : (
								<svg
									className="add-film h-6 w-6"
									onClick={(e) => {
										// display 'added to' message
										e.target
											.closest('.filmCard')
											.classList.add('filmCard-noticeToFavour');
										setTimeout(
											() =>
												e.target
													.closest('.filmCard')
													.classList.remove('filmCard-noticeToFavour'),
											1000
										);

										addFilm(e.target.closest('.filmCard').dataset.id);
									}}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							)}
						</div>
					</div>
				</div>
			);
		});
	} else {
		arrElementFilmSections = '--------Not shows to display now 😿';
	}

	return (
		<div className="row-film">
			<h3>{titleList}</h3>
			<div className="row-film_poster">
				<>{arrElementFilmSections}</>
			</div>
		</div>
	);
};

export default RowFilms;
