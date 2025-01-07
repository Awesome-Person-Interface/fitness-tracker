import React from 'react';
import Navigation from '../components/navigation/Navigation.jsx';
import Nutrition from '../components/nutrition/Nutrition.jsx';

function Pantry({ handleThemeChange, user, fetchUser, routines }) {
  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange} />

      <br></br>
      <div><Nutrition fetchUser={fetchUser} user={user} routines={routines}/></div>

    </div>
  );
}

export default Pantry;
