//  pick film random, instead of linear
const generateNonrepeatNumbers = (quantity, min = 0, max) => {
	if (quantity > max - min + 1) {
		throw new Error('Quantity much smaller than total numbers');
	}

	const pickedNumbers = [];
	while (pickedNumbers.length < quantity) {
		const num = Math.floor(Math.random() * (max - min + 1) + min);
		if (!pickedNumbers.includes(num)) {
			pickedNumbers.push(num);
		}
	}

	return pickedNumbers;
};

export default generateNonrepeatNumbers;
