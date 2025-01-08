import React, { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import IngredientInput from './IngredientInput.jsx';

function RecipesForm({ makingRecipe, setMakingRecipe }) {
  const [formValues, setFormValues] = useState({ name: '' });
  return (
      <Dialog
        open={makingRecipe}
        maxWidth='md'
        fullWidth
        >
        <DialogTitle
          sx={{ }}
        >
          Build a Recipe
        </DialogTitle>
        <DialogContent>
          <FormControl>
          <Grid>
            <Stack>
              <IngredientInput />
            </Stack>
              </Grid>
            <Grid container spacing={12}>
              <Grid>
            <TextField
             label="Recipe Name"
            />
              </Grid>
            </Grid>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setMakingRecipe(false); }}>Cancel</Button>
          <Button>Save</Button>
        </DialogActions>
      </Dialog>
  )
}

export default RecipesForm;
