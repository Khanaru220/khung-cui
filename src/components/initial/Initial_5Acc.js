import generateAcc from '../functions/generateAcc';

// used to set default state 'accounts' in 'App.js'
// return an 'object' {accounts; checkSignin; checkSignup}

// initialize create Friends
const info_5Acc = [
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
		country: 'Iceland',
	},
	// those 2 below to test "add friend" features

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

const Initial_5Acc = () => {
	return info_5Acc.map((info) => generateAcc(info));
};

export default Initial_5Acc;
