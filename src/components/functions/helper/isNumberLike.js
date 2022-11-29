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
		console.error('Not a number', elements);
		return false;
	}
};

export default isNumberLike;
