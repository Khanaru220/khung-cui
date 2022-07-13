const changeHeroVideo = (e, ...sources) => {
	const sourceEl = e.target.querySelector('source');

	// "address" format: "http://localhost:3000/static/media/video_test_0.10c8675933c6410fe176.mp4"
	// import 'src' format: "/static/media/video_test_0.10c8675933c6410fe176.mp4"
	const positionSplit = sourceEl.src.indexOf('/static/media/video');
	const currentSrc = sourceEl.src.slice(positionSplit);

	// find src's index
	const indexSrc = sources.indexOf(currentSrc);

	// newSrc === index current + 1 (if < length - 1)
	// newSrc === index current = 0 (if = length - 1)
	const newSrc =
		indexSrc < sources.length - 1 ? sources[indexSrc + 1] : sources[0];

	// setHeroVideoSrc will use this value to update
	return newSrc;
};

module.exports = changeHeroVideo;
