const isNumberLike = (...elements) => {
	/* 1. not true/false
  convert to number
  2. not string, object
  3. not NaN
   */

	return (
		!elements.some((el) => typeof el === 'boolean') &&
		!elements.map((el) => ++el).some((el) => isNaN(el))
	);
};

export default isNumberLike;
