const ButtonsNavigateForm = ({ isLoginPage, isSignupPage, navigate }) => {
	return (
		<div
			style={{
				display: 'flex',
				gap: '40px',
				gridGap:'40px',
				justifyContent: 'center',
				alignItems: 'center',
				fontWeight: 'bold',
			}}
		>
			<div
				onClick={() => {
					navigate('/signup');
				}}
				// overwrite previous style to combine -- write it behind
				style={
					isSignupPage
						? { ...styleBtnNavigate, ...btnNavHighlight }
						: styleBtnNavigate
				}
			>
				New Account
			</div>
			<div
				onClick={() => {
					navigate('/login');
				}}
				style={
					isLoginPage
						? { ...styleBtnNavigate, ...btnNavHighlight }
						: styleBtnNavigate
				}
			>
				Sign In
			</div>
		</div>
	);
};

const styleBtnNavigate = {
	// border: '1px solid black',
	display: 'inline-block',
	padding: '2px',
	cursor: 'pointer',
};

const btnNavHighlight = {
	border: 'none',
	boxShadow: '0px 4px 0 0px orangered',
};
export default ButtonsNavigateForm;
