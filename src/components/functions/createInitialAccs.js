import generateAcc from './generateAcc';

// used to set default state 'accounts' in 'App.js'
// return an 'object' {accounts; checkSignin; checkSignup}

// initialize create Friends
const initialAccounts = [
	{
		name: 'Vân',
		username: 'fr-vietnam',
		password: 'a',
		country: 'vietnam',
	},
	{
		name: 'Yukiko',
		username: 'fr-japan',
		password: 'a',
		country: 'japan',
	},
	{
		name: 'Ibañez',
		username: 'fr-spain',
		password: 'a',
		country: 'spain',
	},
	{
		name: 'Osman',
		username: 'fr-africa',
		password: 'a',
		country: 'africa',
	},
	{
		name: 'Blöndal',
		username: 'fr-iceland',
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
		username: 'fr-denmark',
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
	return initialAccounts.map((info) => generateAcc(info));
};

export default createInitialAccs;
