import React from 'react';
import Navigation from '../components/navigation/Navigation.jsx';
import AccountPage from '../components/navigation/AccountPage.jsx';

function Account({ handleThemeChange, user, fetchUser }) {
  return (
		<div id="root-app">
			<Navigation handleThemeChange={handleThemeChange} />
			<br></br>
			<div><AccountPage user={user} fetchUser={fetchUser}/></div>
		</div>
  );
}

export default Account;
