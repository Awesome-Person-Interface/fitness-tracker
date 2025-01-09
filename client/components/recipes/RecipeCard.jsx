import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import IngredientList from './IngredientList.jsx';

function RecipeCard({ recipe, getRecipes }) {
  // State vale for tracking if a recipe is being deleted
  const [deletingRecipe, setDeletingRecipe] = useState(false);
  // Function to delete the recipe from the database
  const deleteRecipe = () => {
    // Grab the recipe id
    const { _id } = recipe;
    // Make axios DELETE request
    axios.delete(`/user/recipes/${_id}`)
      .then(getRecipes)
      .then(() => {
        setDeletingRecipe(false);
      })
      .catch((err) => {
        console.error('Error deleting the recipe: ', err);
      })
  }
  return (
    <Grid
      size={4}
    >
      <Card
        sx={{ minHeight: 300, maxHeight: 300, overflow: 'auto' }}
      >
        <CardContent>
          <Typography
            variant="h6"
          >
            {recipe.name}
          </Typography>
          <Typography
            variant="subtitle1"
          >Ingredients
          </Typography>
          <IngredientList ingredients={recipe.ingredients}/>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => { setDeletingRecipe(true) }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <Dialog open={deletingRecipe}>
        <DialogTitle>
          {`Delete ${recipe.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete your ${recipe.name} recipe?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => { setDeletingRecipe(false) }}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteRecipe}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
};

export default RecipeCard;
