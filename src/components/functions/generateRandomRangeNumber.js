// (add feature) pick film random, instead of a range
const generateRandomRangeNumber = (quantity, min = 0, max) => {
	if (quantity > max - min + 1) {
		throw new Error('Quantity much smaller than total numbers');
	}

	const pickedNumbers = [];
	let num = Math.round(Math.random() * (max + 1));

	// stop if: enough quantity
	while (pickedNumbers.length < quantity) {
		// run again if: num already picked
		num = Math.round(Math.random() * max);
		if (!pickedNumbers.includes(num)) {
			pickedNumbers.push(num);
		}
	}

	return pickedNumbers;
};

export default generateRandomRangeNumber;
