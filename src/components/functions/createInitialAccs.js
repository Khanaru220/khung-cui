import generateAcc from './generateAcc';

// used to set default state 'accounts' in 'App.js'
// return an 'object' {accounts; checkSignin; checkSignup}

// initialize create Friends
const initialInfo = [
	{
		name: 'Vân',
		username: 'fr-vi',
		password: 'a',
		country: 'vietnam',
	},
	{
		name: 'Yukiko',
		username: 'fr-ja',
		password: 'a',
		country: 'japan',
	},
	{
		name: 'Ibañez',
		username: 'fr-es',
		password: 'a',
		country: 'spain',
	},
	{
		name: 'Osman',
		username: 'fr-za',
		password: 'a',
		country: 'africa',
	},
	{
		name: 'Blöndal',
		username: 'fr-is',
		password: 'a',
		country: 'iceland',
	},

	{
		name: 'Tui',
		username: 'me',
		password: 'a',
		country: 'universe',
	},
	{
		name: 'Denmark',
		username: 'fr-dk',
		password: 'a',
		country: 'denmark',
	},
	{
		name: 'Kent',
		username: 'fr-us',
		password: 'a',
		country: 'united states',
	},
];

const createInitialAccs = () => {
	return initialInfo.map((info) => generateAcc(info));
};

export default createInitialAccs;
