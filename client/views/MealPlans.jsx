import React from 'react';
import Navigation from '../components/navigation/Navigation.jsx';
import CurrentMealPlans from '../components/nutrition/CurrentMealPlans.jsx';

function MealPlans({ handleThemeChange }) {
  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange}/>
      <br></br>
      <div>
        <CurrentMealPlans />
      </div>
    </div>
  );
}

export default MealPlans;