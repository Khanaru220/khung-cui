import Button from '../Button';
import { useNavigate, useLocation } from 'react-router-dom';
import ButtonsNavigateForm from './ButtonsNavigateForm';
import Form from './Form';

const FormAccount = ({ doSignup, doLogin, accountLogin }) => {
	// '/login', '/signup' when render this component
	const currentLocation = useLocation().pathname;
	const navigate = useNavigate(); // don't know how it different
	let isLoginPage = currentLocation === '/login';
	let isSignupPage = currentLocation === '/signup';
	return (
		<div className="container-fullScreen">
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%,-50%)',
				}}
			>
				<ButtonsNavigateForm
					navigate={navigate}
					isLoginPage={isLoginPage}
					isSignupPage={isSignupPage}
				/>
				<Form
					isLoginPage={isLoginPage}
					isSignupPage={isSignupPage}
					doSignup={doSignup}
					doLogin={doLogin}
					accountLogin={accountLogin}
				/>
			</div>
		</div>
	);
};

export default FormAccount;
