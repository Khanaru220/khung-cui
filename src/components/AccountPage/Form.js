import './Form.css';
import { useState } from 'react';
import InputSelectField from '../InputSelectField';
import InputText_CheckboxField from '../InputText_CheckboxField';
import validateEmpty from '../validateEmpty';

const initialState = () => {
	return {
		// need type exactly with 'id' of <input>
		// -- better solution is make relationship between this 'object state' vs. 'id' list of <input>
		username: '',
		password: '',
		country: 'asia', // 'value' of 1st <option>
		// will be used for looping in 'validateEmpty' -- better solution, build a way to attach 'isRequired' into 'props' when call component
		// lack 'country' -- need a solution to toggle it in list between [sign-up/log-ign]
		requiredList: ['username', 'password'],
	};
};

const Form = ({ doSignup, doLogin, isLoginPage, isSignupPage }) => {
	const [accInput, setAccInput] = useState(initialState());
	const inputChange = (e) => {
		// (1) re-copy previous state
		// (2) change new input
		setAccInput({ ...accInput, [e.target.id]: e.target.value });
	};

	return (
		<form onSubmit={(e) => e.preventDefault()} className="form-account">
			<div className="input-line">
				<InputText_CheckboxField
					value={accInput.username}
					handleChange={inputChange}
					type="text"
					id="username"
					label="Username:"
				/>
				{isSignupPage ? (
					<InputSelectField
						value={accInput.country}
						handleChange={inputChange}
						id="country"
						// use 'space' instead of 'dash' -- easier for request API search
						arrPair_ValueLabel={[
							// change to 'continent' instead 'country'
							['asia', 'AS'],
							['africa', 'AF'],
							['europe', 'EU'],
							['north ameria', 'NA'],
							['south ameria', 'SA'],
							['antarctica', 'AN'],
							['australia', 'AU'],
							['universe', 'limit-is-the-sky'],
						]}
					/>
				) : (
					''
				)}
			</div>

			<div className="input-line">
				<InputText_CheckboxField
					value={accInput.password}
					handleChange={inputChange}
					type="password"
					id="password"
					label="Password:"
				/>
				<button
					className={'btnSubmit'}
					onClick={() => {
						// i can do better combination if use 'chaining method'
						if (!validateEmpty(accInput)) return;
						if (isSignupPage) {
							doSignup(accInput);
						} else if (isLoginPage) {
							doLogin(accInput);
						}
					}}
				>
					{isSignupPage ? 'Register' : 'Sign in'}
				</button>
			</div>

			{/* <InputText_CheckboxField
					type="checkbox"
					value="remember-me"
					id="remember"
					label="Remember me"
				/> */}
			{isLoginPage ? <a href="#">Forgot password?</a> : ''}

			{/* <button onClick={'_loginAccount'}>Log-in</button>
				<button onClick={() => {}}>Log-out</button> */}
		</form>
	);
};

// -----------------------------------

// -----------------------------------
export default Form;
