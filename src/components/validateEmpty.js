const validateEmpty = (accInput) => {
	// (TODO) a better solution: I need more speicific and detail 'argument' like down to property ({requiredList, id...})  -- because accInput can be variant
	// loop through requiredList check that whether field of accInput is empty
	const idFieldEmpty = accInput.requiredList.find(
		(idFieldRequired) => accInput[idFieldRequired] === ''
	);
	if (idFieldEmpty) {
		alert(`🔴 ${idFieldEmpty.toUpperCase()} is required. Please fill it`);
		return;
	} else {
		return accInput;
	}
};

export default validateEmpty;
