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

function RecipesGrid({ recipes, getRecipes }) {
  return (
    <Grid
      container
      spacing={1}
    >
      {recipes.map((recipe) => {
        return (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            getRecipes={getRecipes}
          />
          )
      })}
    </Grid>
  )
};

export default RecipesGrid;
