const toCapitalizeFirstLetter = (string) => {
	/*  (!) toCapitalizeFirstLetter(string) | string.toUpperCase()
	differnt look with built-in 
	*/
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default toCapitalizeFirstLetter;
