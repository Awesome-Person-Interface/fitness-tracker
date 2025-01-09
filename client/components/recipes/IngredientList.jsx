import React from 'react';
import axios from 'axios';
import {
  Stack,
  List,
  ListItem,
  IconButton,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Ingredient from './Ingredient.jsx';

function IngredientList({ ingredients }) {
  return (
    <Grid container spacing={0}>
      {ingredients.map((ingredient) => {
        return (
          <Ingredient
            key={ingredient._id}
            amount={ingredient.amount}
            unit={ingredient.unit}
            name={ingredient.name}
          />
        )
      })}
    </Grid>
  )
};

export default IngredientList;
