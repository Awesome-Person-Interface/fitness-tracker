import React, { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

function RecipesForm({ makingRecipe, setMakingRecipe }) {
  const [formValues, setFormValues] = useState({ name: '' });
  return (
      <Dialog
        open={makingRecipe}
        maxWidth='lg'
        fullWidth
        >
        <DialogTitle>
          Build a Recipe
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <Grid container spacing={12}>
              <Grid>
            <TextField
             label="Recipe Name"
            />
              </Grid>
            </Grid>
          </FormControl>
        </DialogContent>
      </Dialog>
  )
}

export default RecipesForm;
