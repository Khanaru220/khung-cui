import InputTextCheckboxField from '../InputTextCheckboxField';
import { useState } from 'react';

const FriendAddField = ({ accounts, accountLogin, setAccounts }) => {
	const [friendUserName, setFriendUserName] = useState('');
	const addFriend = (friendUserName) => {
		//check account exist -- can break the 'doSignup'
		if (accounts.some((acc) => acc.username === friendUserName)) {
			// (!) hard to change property, element deeper level with this 'copy' technique
			const copiedAccounts = [...accounts];

			// bad solution -- remove dubplicate friends username
			copiedAccounts[copiedAccounts.indexOf(accountLogin)].friends = [
				...new Set([...accountLogin.friends, friendUserName]),
			];
			setAccounts(copiedAccounts);
		} else {
			alert(`🔴 USERNAME doesn't exist`);
		}
	};
	return (
		<form className="friend-add-field" onSubmit={(e) => e.preventDefault()}>
			<InputTextCheckboxField
				type="text"
				id="friend-username"
				value={friendUserName}
				handleChange={(e) => setFriendUserName(e.target.value)}
				placeholder="Friend's username"
			/>
			<button
				onClick={(e) => {
					//.getElementById('friend-username') --- .getElementById() only used in global 'document'
					addFriend(document.getElementById('friend-username').value);
					setFriendUserName('');
				}}
			>
				Add
			</button>
		</form>
	);
};

export default FriendAddField;
