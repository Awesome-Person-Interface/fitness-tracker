import React from 'react';
import axios from 'axios';
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function RecipesForm({ makingRecipe, setMakingRecipe }) {
  return (
    <FormControl>
      <Dialog open={makingRecipe}>
        <DialogTitle>
          Build a Recipe
        </DialogTitle>
      </Dialog>
    </FormControl>
  )
}

export default RecipesForm;
