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

/*** THIS FORM HAS LOTS OF CONDITIONALS BECAUSE IT IS USED FOR EDITING AND MAKING RECIPES
 * This form will render conditionally based on if a new recipe is being created or if a recipe is being edited
 * When editing a form, this component renders from the recipe RecipeCard component
 * When making a form, this component renders from the MealsPlan view /client/views/MealPlans.jsx
 * When editing, input fields will render with values
 * When making, input fields will render empty
 * Event will be conditional to whether you are in editing or creating mode
 * Pay close attention to any ternaries, there are plenty on this component and in the IngredientInput component
 */
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
  // Set state value to hold the recipe
  const [currRecipe, setCurrRecipe] = useState({ ...recipe });
  const addIngredient = () => {
    if (formValues.ingredients.length === 10) {
      setAlert(true);
      return;
    }
    // See if were editing or making a recipe
    if (!editingRecipe) {
    // Make a copy of the formValues
    const formCopy = {...formValues};
    // Add an empty string to the end of the ingredients array
    formCopy.ingredients.push({ name: '', amount: '', unit: '', });
    // Set formValues in state to the formCopy
    setFormValues(formCopy);
    } else {
       // Make a copy of the currRecipe
    const recipeCopy = {...currRecipe};
    // Add an empty string to the end of the ingredients array
    recipeCopy.ingredients.push({ name: '', amount: '', unit: '', });
    // Set currRecipe in state to the formCopy
    setCurrRecipe(recipeCopy);
    }
  }
    // Function to handle state changes for name, serves, time, and notes
    const handleFormChange = (element) => {
      // Grab the value and the id
      const { value, id } = element.target;
      const formCopy = { ...formValues };
      formCopy[id] = value;
      setFormValues(formCopy);
    }
    // Function to handle recipe editing for name, serves, time, and notes
    const handleRecipeChange = (element) => {
      // Grab the value and the id
      const { value, id } = element.target;
      // Make a copy of recipe in state
      const recipeCopy = { ...currRecipe };
      recipeCopy[id] = value;
      setCurrRecipe(recipeCopy)
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
          getRecipes();
          setEditingRecipe(false);
      } else {
        setMakingRecipe(false);
      }
    }
    // Function to edit recipe in the database
    const patchRecipe = () => {
      // Grab the id from the recipe
      const { _id } = currRecipe;
      // Build the config
      const config = {
        recipe: currRecipe,
      }
      // Make axios PATCH req with the id
      axios.patch(`/user/recipes/${_id}`, config)
      .then(getRecipes)
      .then(() => {
        setEditingRecipe(false);
      })
      .catch((err) => {
        console.error('Error PATCHing recipe with axios: ', err);
      })
    }
  return (
      <Dialog
        open={editingRecipe || makingRecipe}
        maxWidth='sm'
        fullWidth
        >
        <DialogTitle
          sx={{ }}
        >
        {editingRecipe ? `Edit ${currRecipe.name}` : 'Build a Recipe' }
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
                  value={editingRecipe ? currRecipe.name : formValues.name}
                  id="name"
                  onChange={makingRecipe ? handleFormChange : handleRecipeChange}
                />
                <TextField
                  variant="standard"
                  label="Serves"
                  value={editingRecipe ? currRecipe.serves : formValues.serves}
                  id="serves"
                  onChange={makingRecipe ? handleFormChange : handleRecipeChange}
                />
                <TextField
                  variant="standard"
                  label="Cook Time"
                  value={editingRecipe ? currRecipe.time : formValues.time}
                  id="time"
                  onChange={makingRecipe ? handleFormChange : handleRecipeChange}
                />
              </Stack>
            </Grid>
            <Grid size={11}>
              <Typography>Notes:</Typography>
              <TextField
                id="notes"
                value={editingRecipe ? currRecipe.notes : formValues.notes}
                placeholder="Leave any notes, instructions, or description of this recipe here!"
                multiline
                fullWidth
                minRows={2}
                onChange={makingRecipe ? handleFormChange : handleRecipeChange}
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
              : currRecipe.ingredients.map((ingredient, index) => {
                return <IngredientInput
                  key={ingredient._id}
                  value={ingredient.name}
                  index={index}
                  formValues={currRecipe}
                  setFormValues={setFormValues}
                  setCurrRecipe={setCurrRecipe}
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
            onClick={!editingRecipe ? handleSaveClick : patchRecipe}
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
