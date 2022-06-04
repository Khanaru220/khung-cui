import InputTextCheckboxField from '../InputTextCheckboxField.js';
import toCapitalizeFirstLetter from './../functions/toCapitalizeFirstLetter';

const filter_genres = ['Adventure', 'Romance', 'Nature', 'Crime'];
// (!) need a way to sync between 'genres option isChecked' vs. 'objFilters' -- one source of truth

const FormFilter = ({ accounts,objFitlers, setFilter, accountLogin }) => {
	const filter_friends = accountLogin.friends;
	const handleChange = (e) => {
		// 1. back, select the parent groupFilter
		const groupFilterEl = e.target.closest('[data-type="filter"]');
		let value;
		// 2.  select all the ':checked' input
		if (e.target.getAttribute('type') === 'checkbox') {
			// bad solution, used to separate 'since-text' vs. 'checkbox group'
			// .querySelectorAll return 'node' --> conver to array to use 'map'
			value = [...groupFilterEl.querySelectorAll(':checked')].map(
				(node) => node.value
			);
			// a little long, when "pass setState, use setState in another function"
		} else if (e.target.getAttribute('type') === 'number') {
			value = Number(e.target.value);
		}
		setFilter(groupFilterEl.dataset.type_filter, value);
	};

	return (
		<form
			className="formFilter"
			onChange={handleChange}
			onSubmit={(e) => e.preventDefault()}
		>
			{/* (!) those 3 <input> can be Component */}
			{/* data-type is an anchor to select /*}
			{/* --> read data-type_filter --> contains the name_property of state 'objFilters'  */}
			<div data-type="filter" data-type_filter="since">
				<InputTextCheckboxField
					type="number"
					label={`Since year:`}
					id="since"
					value={objFitlers.since}
					// browser required this onChange when use 'value' --> it duplicate with onChange of <form> above
					// --> don't know the order and how those 2 onChange processing
					handleChange={handleChange} // 'value' to build arrFilter --> (?) do i need 'value' --> i can make id === value
				/>
			</div>
			<div data-type="filter" data-type_filter="genres">
				{filter_genres.map((option, i) => (
					<InputTextCheckboxField
						key={i}
						type="checkbox"
						label={toCapitalizeFirstLetter(option)}
						id={option.toLowerCase()}
						value={toCapitalizeFirstLetter(option)} // 'value' to build arrFilter --> (?) do i need 'value' --> i can make id === value
					/>
				))}
			</div>
			{accountLogin.friends.length >0 ? <div data-type="filter" data-type_filter="friends">
				{filter_friends.map((frUsername, i) => {
					const nameOfFriend = accounts.find(acc=>acc.username===frUsername).name
					return(
						<InputTextCheckboxField
							key={i}
							type="checkbox"
							label={`🐱‍🏍 ${nameOfFriend}`}
							id={frUsername.toLowerCase()}
							value={frUsername} // 'value' to build arrFilter --> (?) do i need 'value' --> i can make id === value
						/>


					)}
				)}
			</div> : ''}
			
		</form>
	);
};
export default FormFilter;
