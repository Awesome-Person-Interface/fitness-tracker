import React from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  Stack,
  IconButton,
} from '@mui/material';

function IngredientList() {
  return (
    <List>
      {ingredients.map((ingredient) => {
        return (
          <ListItem>{ingredient.name}</ListItem>
        )
      })}
    </List>
  )
};

export default IngredientList;
