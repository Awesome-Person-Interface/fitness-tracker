import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import IngredientList from './IngredientList.jsx';
import NutritionList from './NutritionList.jsx';
import RecipeForm from './RecipeForm.jsx';

function RecipeCard({ recipe, getRecipes, makingRecipe, setMakingRecipe }) {
  // State vale for tracking if a recipe is being deleted
  const [deletingRecipe, setDeletingRecipe] = useState(false);
  // State value to track if we are editing the recipe
  const [editingRecipe, setEditingRecipe] = useState(false);
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
    <>
      <Card
        sx={{ minHeight: 300, maxHeight: 300, overflow: 'auto', background: '#004d40' }}
      >
        <CardContent>
          <Typography
            variant="h6"
          >
            {recipe.name}
          </Typography>
          <Typography variant="body">
            {recipe.notes ? recipe.notes : 'No notes for this recipe'}
          </Typography>
          <Grid container spacing={1}>
            <Grid
              size={6}
            >
              <Typography
                variant="subtitle1"
              >Ingredients
              </Typography>
              <IngredientList ingredients={recipe.ingredients}/>
            </Grid>
            <Grid size={6}>
              <Typography
                variant="subtitle1"
                >Nutrition
              </Typography>
              <NutritionList nutrition={recipe.nutrition}/>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ background: '#004d40'}}>
          <Button
            onClick={() => { setDeletingRecipe(true) }}
            sx={{ background: '#bdbdbd', color: '#212121' }}
          >Delete
          </Button>
          <Button
            onClick={() => { setEditingRecipe(true); }}
            sx={{ background: '#bdbdbd', color: '#212121' }}
          >Edit
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
      <Dialog open={editingRecipe}>
        <DialogContent>
          <RecipeForm
            makingRecipe={makingRecipe}
            setMakingRecipe={setMakingRecipe}
            getRecipes={getRecipes}
          />
        </DialogContent>
      </Dialog>
      </>
  )
};

export default RecipeCard;
