import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//(?) is there right way to run function only 1 in react
// -> i assume i'm putting code on top-levl, outside component
import checkFlexGap from './components/functions/checkFlexGap';
checkFlexGap();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
