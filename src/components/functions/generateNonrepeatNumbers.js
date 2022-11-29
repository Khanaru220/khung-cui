//  pick film random, instead of linear
const generateNonrepeatNumbers = (quantity, min = 0, max) => {
	if (quantity > max - min + 1) {
		throw new Error('Quantity much smaller than total numbers');
	}

	const pickedNumbers = new Set();
	while ([...pickedNumbers].length < quantity) {
		const random = Math.floor(Math.random() * (max - min + 1) + min);
		pickedNumbers.add(random);
	}

	return [...pickedNumbers];
};

export default generateNonrepeatNumbers;
