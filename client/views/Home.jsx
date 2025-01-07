import React from 'react';
import Navigation from '../components/navigation/Navigation.jsx';
import Dashboard from '../components/dashboard/Dashboard.jsx';

function Home({ handleThemeChange, user }) {
  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange} />
      {user ?
      <div>
        <Dashboard user={user}/>
      </div>
      :
      <div>
        <h1 style={{textAlign:"center"}}>401</h1>
        <h2 style={{textAlign:"center"}}>Unauthorized; please re-attempt login.</h2>
      </div>
      }
    </div>
  );
}

export default Home;
