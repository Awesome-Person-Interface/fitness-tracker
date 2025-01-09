import React from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  Stack,
  IconButton,
  Divider,
} from '@mui/material';
import Ingredient from './Ingredient.jsx';

function IngredientList({ ingredients }) {
  return (
    <List>
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
    </List>
  )
};

export default IngredientList;
