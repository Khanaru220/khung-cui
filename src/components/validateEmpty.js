const validateEmpty = (accInput) => {
	// a better solution --- I need more speicific and detail 'argument' like down to property ({requiredList, id...})  -- because 'accInput' can be variant
	// loop through 'requiredList' and check that whether field of 'accInput' is empty
	const idFieldEmpty = accInput.requiredList.find(
		(idFieldRequired) => accInput[idFieldRequired] === ''
	);
	// if (not element empty) --> return 'accInput' --> for 'chaining functions'
	// if (has element empty) --> alert() + return 'undefined'
	if (idFieldEmpty) {
		alert(`🔴 ${idFieldEmpty.toUpperCase()} is required. Please fill it`);
		return;
	} else {
		return accInput;
	}
};

export default validateEmpty;
