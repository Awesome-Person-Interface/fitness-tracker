import React, { useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TextField,
  Stack,
  Snackbar,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import IngredientInput from './IngredientInput.jsx';

function RecipesForm({ makingRecipe, setMakingRecipe, getRecipes, editingRecipe, setEditingRecipe, recipe }) {
  // Set state value for holding the forms values
  const [formValues, setFormValues] = useState(
    { name: '',
      serves: '',
      time: '',
      notes: '',
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
  // Set state value for opening the Snackbar alert
  const [alert, setAlert] = useState(false);
  const addIngredient = () => {
    if (formValues.ingredients.length === 10) {
      setAlert(true);
      return;
    }
    // Make a copy of the formValues
    const formCopy = {...formValues};
    // Add an empty string to the end of the ingredients array
    formCopy.ingredients.push({ name: '', amount: '', unit: '', });
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
      .then(getRecipes)
      .then(() => {
        // Close the form
        setMakingRecipe(false);
      }).catch((err) => {
        console.error('Recipe failed to POST: ', err);
      })
    };
    // Close the dialog boxes
    const closeDialog = () => {
      if (editingRecipe) {
        setEditingRecipe(false);
        setMakingRecipe(false);
      } else {
        setMakingRecipe(false);
      }
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
        {editingRecipe ? `Edit ${recipe.name}` : 'Build a Recipe' }
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
                  value={editingRecipe ? recipe.name : formValues.name}
                  id="name"
                  onChange={handleFormChange}
                />
                <TextField
                  variant="standard"
                  label="Serves"
                  value={editingRecipe ? recipe.serves : formValues.serves}
                  id="serves"
                  onChange={handleFormChange}
                />
                <TextField
                  variant="standard"
                  label="Cook Time"
                  value={editingRecipe ? recipe.time : formValues.time}
                  id="time"
                  onChange={handleFormChange}
                />
              </Stack>
            </Grid>
            <Grid size={11}>
              <Typography>Notes:</Typography>
              <TextField
                id="notes"
                value={editingRecipe ? recipe.notes : formValues.notes}
                placeholder="Leave any notes, instructions, or description of this recipe here!"
                multiline
                fullWidth
                minRows={2}
                onChange={handleFormChange}
                />
            </Grid>
            <Grid container spacing={1.5}>
              {!editingRecipe
               ? formValues.ingredients.map((ingredient, index) => {
                return <IngredientInput
                  key={index * 2}
                  value={ingredient.name}
                  index={index}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  />
              })
              : recipe.ingredients.map((ingredient, index) => {
                return <IngredientInput
                  key={ingredient._id}
                  value={ingredient.name}
                  index={index}
                  formValues={recipe}
                  setFormValues={setFormValues}
                  editingRecipe={true}
                  />
              })
            }
              <Button
                variant="text"
                onClick={addIngredient}
              >+ Add Ingredient
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button
            onClick={handleSaveClick}
          >Save</Button>
        </DialogActions>
        <Snackbar
          open={alert}
          autoHideDuration={6000}
          onClose={() => { setAlert(false); }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
          <Alert
            onClose={() => { setAlert(false); }}
            severity="error"
            variant="filled"
          >
            10 Ingredients is the max for now!
          </Alert>
        </Snackbar>
      </Dialog>
  )
}

export default RecipesForm;
