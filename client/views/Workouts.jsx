import React from 'react';
import Navigation from '../components/navigation/Navigation.jsx';
import Routines from '../components/workouts/Routines.jsx';

function Workouts({ handleThemeChange, user, fetchUser, routines }) {
 return (
  <div id="root-app">
    <Navigation handleThemeChange={handleThemeChange} />
    <br></br>
    {user ?
      <div>
        <Routines user={user} fetchUser={fetchUser} routines={routines} workouts={user.workouts}/>
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

export default Workouts;
