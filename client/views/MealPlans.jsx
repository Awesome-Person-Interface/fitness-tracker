import  React, { useState } from 'react';
import Navigation from '../components/navigation/Navigation.jsx';
import CurrentMealPlans from '../components/nutrition/CurrentMealPlans.jsx';
import {
  Button,
} from '@mui/material';
import RecipesForm from '../components/recipes/RecipeForm.jsx';

function MealPlans({ handleThemeChange }) {
  // Set a state value to indicate if a custom recipe/meal is being created
  const [makingRecipe, setMakingRecipe] = useState(false);

  // Function to toggle makeRecipe to true
  const makeRecipe = () => {
    setMakingRecipe(true);
  }
  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange}/>
      <br></br>
      <Button
      variant="contained"
      onClick={makeRecipe}
      >
        Create Recipe
      </Button>
      {makingRecipe
      ? <RecipesForm
          makingRecipe={makingRecipe}
          setMakingRecipe={setMakingRecipe}
          />
      : <CurrentMealPlans />}
    </div>
  );
}

export default MealPlans;