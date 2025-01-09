import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material'

function RecipesGrid() {
    // Hold the recipes in state
    const [recipes, setRecipes] = useState([]);
    // GET the recipes from the database
    const getRecipes = () => {
      console.log('Get recipes invoked');
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
    <Grid>
      {recipes.map((recipe) => {
        return (
          <Card
            sx={{ maxWidth: 345 }}
            key={recipe._id}
            >
          <CardContent>
            <Typography
              variant="h6"
            >
              {recipe.name}
            </Typography>
          </CardContent>
        </Card>
        )
      })}
    </Grid>
  )
};

export default RecipesGrid;
