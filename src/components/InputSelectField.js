const InputSelectField = ({ id, arrPair_ValueLabel, handleChange }) => {
	// arrPair_ValueLabel --- a better solution, I need a convert table (country name --> shortform)
	// use 'space' instead of 'dash' -- easier for request API search
	// (TODO) better solution, add a way to convert 'dash' to 'space'
	return (
		<select id={id} onChange={handleChange}>
			{arrPair_ValueLabel.map((pair, i) => (
				<option key={i} value={pair[0]}>
					{pair[1]}
				</option>
			))}
		</select>
	);
};

export default InputSelectField;
