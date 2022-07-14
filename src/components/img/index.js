const [heroVideos, heroSmallVideos] = [[], []];
heroVideos[0] = require('./video_test_0.mp4');
heroVideos[1] = require('./video_test_1.mp4');
heroVideos[2] = require('./video_test_2.mp4');

heroSmallVideos[0] = require('./video_small_test_0.mp4');
heroSmallVideos[1] = require('./video_small_test_1.mp4');
heroSmallVideos[2] = require('./video_small_test_2.mp4');

const logo = require('./khung-cui-logo.png');
const mp3 = require('./khung-cui-pronounce.mp3');
const loadingPoster = require('./loading-poster.gif');

export { logo, mp3, loadingPoster, heroVideos, heroSmallVideos };
