// obj API not always store in 'lowercase' :(
// (?) need learn create 'chaining method' --- to make it like toLowerCase()
const toCapitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default toCapitalizeFirstLetter;
