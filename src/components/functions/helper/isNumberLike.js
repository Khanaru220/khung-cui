const isNumberLike = (...elements) => {
	/* 1. not true/false
  convert to number
  2. not string, object
  3. not NaN
   */
	if (
		!elements.some((el) => typeof el === 'boolean') &&
		!elements.map((el) => ++el).some((el) => isNaN(el))
	) {
		return true;
	} else {
		// not neccessary, but at least announce a signal while not having error hanlder
		console.error('Error validate: Not a number', elements);
		return false;
	}
};

export default isNumberLike;
