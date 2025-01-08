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
  const [formValues, setFormValues] = useState(
    { name: '',
      ingredients: [{
        name: '',
        unit: '',
      }, {
        name: '',
        unit: '',
      }, {
        name: '',
        unit: '',
      },
    ],
  });
  const addIngredient = () => {
    // Make a copy of the formValues
    const formCopy = {...formValues};
    // Add an empty string to the end of the ingredients array
    formCopy.ingredients.push({ ingredient: '', unit: '', });
    // Set formValues in state to the formCopy
    setFormValues(formCopy);
  }
  return (
      <Dialog
        open={makingRecipe}
        maxWidth='sm'
        fullWidth
        >
        <DialogTitle
          sx={{ }}
        >
          Build a Recipe
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
          <Grid>
            <Stack direction="row" spacing={4}>
              <TextField
                variant="standard"
                label="Recipe name"
              />
              <TextField
                variant="standard"
                label="Serves"
              />
              <TextField
                variant="standard"
                label="Cook Time"
              />
            </Stack>
            </Grid>
            <Grid>
              {formValues.ingredients.map((ingredient, index) => {
                return <IngredientInput
                  key={index * 2}
                  value={ingredient.name}
                  index={index}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  />
              })}
              <Button
                variant="text"
                onClick={addIngredient}
              >+ Add Ingredient
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setMakingRecipe(false); }}>Cancel</Button>
          <Button>Save</Button>
        </DialogActions>
      </Dialog>
  )
}

export default RecipesForm;
