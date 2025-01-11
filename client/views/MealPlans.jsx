import  React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
} from '@mui/material';
import Navigation from '../components/navigation/Navigation.jsx';
import CurrentMealPlans from '../components/nutrition/CurrentMealPlans.jsx';
import RecipesForm from '../components/recipes/RecipeForm.jsx';
import RecipesGrid from '../components/recipes/RecipesGrid.jsx'

function MealPlans({ handleThemeChange }) {
  // Set a state value to indicate if a custom recipe/meal is being created
  const [makingRecipe, setMakingRecipe] = useState(false);
  // Hold the recipes in state
  const [recipes, setRecipes] = useState([]);
  // Function to toggle makeRecipe to true
  const makeRecipe = () => {
    setMakingRecipe(true);
  }
  // GET the recipes from the database
  const getRecipes = () => {
    // Make axios GET req to /user/recipes
    axios.get('/user/recipes')
      .then(({ data }) => {
        setRecipes(data);
      }).catch((err) => {
          console.error('Error GETting the recipes from the server: ', err);
      });
    };
  // When the component mounts, call getRecipes
    useEffect(getRecipes, []);
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
          getRecipes={getRecipes}
          />)
      : <CurrentMealPlans />}
      <Typography variant="h5">Your Recipes</Typography>
      <RecipesGrid
        recipes={recipes}
        getRecipes={getRecipes}
        makingRecipe={makingRecipe}
        setMakingRecipe={setMakingRecipe}
      />
    </div>
  );
}

export default MealPlans;