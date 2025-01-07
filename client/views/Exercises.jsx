import React from 'react';
import Navigation from '../components/navigation/Navigation.jsx';
import WorkoutList from '../components/workouts/WorkoutList.jsx'

function Exercises({ handleThemeChange, user, fetchUser  }) {
  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange} />
      <br></br>
      {user ?
        <div>
          <WorkoutList user={user} fetchUser={fetchUser} workouts={user.workouts}/>
        </div>
        :
        <div>
          <h1 style={{textAlign:"center"}}>401</h1>
          <h2 style={{textAlign:"center"}}>Unauthorized; please re-attempt login.</h2>
        </div>
      }
    </div>
  );
};

export default Exercises;
