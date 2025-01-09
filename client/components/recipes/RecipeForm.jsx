import React, { useState } from 'react';
import axios from 'axios';
import {
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
  // Set state value for holding the forms values
  const [formValues, setFormValues] = useState(
    { name: '',
      serves: '',
      time: '',
      ingredients: [{
        name: '',
        amount: '',
        unit: '',
      }, {
        name: '',
        amount: '',
        unit: '',
      }, {
        name: '',
        amount: '',
        unit: '',
      },
    ],
  });
  // Set state value for if a required textField should display an error
  const [error, setError] = useState(false);
  const addIngredient = () => {
    // Make a copy of the formValues
    const formCopy = {...formValues};
    // Add an empty string to the end of the ingredients array
    formCopy.ingredients.push({ ingredient: '', unit: '', });
    // Set formValues in state to the formCopy
    setFormValues(formCopy);
  }
    // Function to handle state changes for name, serves, and time
    const handleFormChange = (element) => {
      // Grab the value and the id
      const { value, id } = element.target;
      const formCopy = { ...formValues };
      formCopy[id] = value;
      setFormValues(formCopy);
    }
    // Function to save the user's recipe to the database
    const handleSaveClick = () => {
      // Make sure the name field is not empty
      if (!formValues.name) {
        setError(true);
        return;
      }
      // Build config to send to the server
      const config = {
        recipe: formValues,
      }
    // Make axios POST request to /user/recipes
    axios.post('/user/recipes', config)
      .then(() => {
        // Close the form
        setMakingRecipe(false);
      }).catch((err) => {
        console.error('Recipe failed to POST: ', err);
      })
    };
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
                  error={error}
                  required
                  variant="standard"
                  label="Recipe name"
                  value={formValues.name}
                  id="name"
                  onChange={handleFormChange}
                />
                <TextField
                  variant="standard"
                  label="Serves"
                  value={formValues.serves}
                  id="serves"
                  onChange={handleFormChange}
                />
                <TextField
                  variant="standard"
                  label="Cook Time"
                  value={formValues.time}
                  id="time"
                  onChange={handleFormChange}
                />
              </Stack>
            </Grid>
            <Grid container spacing={1.5}>
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
          <Button
            onClick={handleSaveClick}
          >Save</Button>
        </DialogActions>
      </Dialog>
  )
}

export default RecipesForm;
