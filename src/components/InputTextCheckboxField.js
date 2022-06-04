const InputText_CheckboxField = ({ type, id, label=null, value, handleChange, placeholder }) => {
	// 'htmlFor' make it able to click 'label' --> target 'input'
	return (
		<div>
			{label ? <label htmlFor={id}>{label}</label> : ''}
			<input type={type} id={id} value={value} onChange={handleChange} placeholder={placeholder} />
		</div>
	);
};

export default InputText_CheckboxField;
