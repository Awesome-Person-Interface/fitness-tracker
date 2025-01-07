import React from 'react';
import Navigation from '../components/navigation/Navigation.jsx';
import WorkoutSearch from '../components/workouts/WorkoutSearch.jsx';

function ExercisesSearch({ handleThemeChange, user, fetchUser }) {
  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange} />
      <br></br>
      <div>
        <WorkoutSearch user={user} fetchUser={fetchUser}/>
      </div>
    </div>
  );
}

export default ExercisesSearch;
