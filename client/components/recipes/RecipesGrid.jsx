import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2';
import RecipeCard from './RecipeCard.jsx';

function RecipesGrid({ recipes, getRecipes, makingRecipe, setMakingRecipe }) {
  return (
    <Grid
      container
      spacing={1}
    >
      {recipes.map((recipe) => {
        return (
          <Grid
            size={4}
            key={recipe._id}
          >
            <RecipeCard
              recipe={recipe}
              getRecipes={getRecipes}
              makingRecipe={makingRecipe}
              setMakingRecipes={setMakingRecipe}
            />
          </Grid>
          )
      })}
    </Grid>
  )
};

export default RecipesGrid;
