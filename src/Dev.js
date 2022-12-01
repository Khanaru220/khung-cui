// (!) temporary way to test function result on browser's console while development
// (IDEA) use unit-test but each time run 5~8s, low + not support folding object in Node
// import fetchAPIFilms from './components/functions/fetchAPIFilms';
// import getGenres from './components/functions/helper/getGenres';

const _dev = () => {
	if (!process.env.NODE_ENV === 'development') return; // (TODO) check whether it work when build online

	// fetchAPIFilms()
	// getGenres()
};

export default _dev;
