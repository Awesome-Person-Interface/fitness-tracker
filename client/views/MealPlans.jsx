import  React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
} from '@mui/material';
import Navigation from '../components/navigation/Navigation.jsx';
import CurrentMealPlans from '../components/nutrition/CurrentMealPlans.jsx';
import RecipesForm from '../components/recipes/RecipeForm.jsx';
import RecipesGrid from '../components/recipes/RecipesGrid.jsx'

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
      ? (<RecipesForm
          makingRecipe={makingRecipe}
          setMakingRecipe={setMakingRecipe}
          />)
      : <CurrentMealPlans />}
      <RecipesGrid />
    </div>
  );
}

export default MealPlans;