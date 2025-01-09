import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material'
import IngredientList from './IngredientList.jsx';

function RecipesGrid({ recipes }) {
  return (
    <Grid
      container
      spacing={2}
    >
      {recipes.map((recipe) => {
        return (
          <Grid
            key={recipe._id}
            size={4}
            >
            <Card
              sx={{ minHeight: 300, maxHeight: 300, overflow: 'auto' }}
              >
            <CardContent>
              <Typography
                variant="h6"
              >
                {recipe.name}
              </Typography>
              <Typography
                variant="subtitle1"
              >Ingredients
              </Typography>
              <IngredientList ingredients={recipe.ingredients}/>
            </CardContent>
            <CardActions>
              <Button>Delete</Button>
            </CardActions>
          </Card>
        </Grid>
          )
      })}
    </Grid>
  )
};

export default RecipesGrid;
