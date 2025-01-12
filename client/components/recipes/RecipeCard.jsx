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
  Divider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import '@fontsource/merriweather';
// Supports weights 100-900
import '@fontsource-variable/noto-serif';
import "@fontsource/noto-sans-georgian";
import IngredientList from './IngredientList.jsx';
import NutritionList from './NutritionList.jsx';
import RecipeForm from './RecipeForm.jsx';

// Create a custom theme
let cardTheme = createTheme({
  palette: {
      primary: {
          main: '#722211',
      },
      secondary: {
        main: '#415664'
      },
  },
  typography: {
      // fontFamily: "Alkatra",
   h5: {
    fontFamily: 'Merriweather'
   },
   subtitle1: {
    fontSize: 16,
   },
   subtitle2: {
    fontWeight: 400,
    fontSize: 18,
    fontFamily: 'Noto-Sans-Georgian'
   }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#bdbdbd',
          fontWeight: 400,
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        fullWidth: {
          backgroundColor: 'white'
        },
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
        '&.Mui-checked': {
          color: 'white'
        }
        }
      }
    }
  }
});
cardTheme = responsiveFontSizes(cardTheme);
function RecipeCard({ recipe, getRecipes, makingRecipe, setMakingRecipe }) {
  // State vale for tracking if a recipe is being deleted
  const [deletingRecipe, setDeletingRecipe] = useState(false);
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
  // Toggle edit recipe and makingRecipe
  const editRecipe = () => {
    setEditingRecipe(true);
  }
  return (
    <>
      <ThemeProvider theme={cardTheme}>
      <Card
        sx={{ minHeight: 300, maxHeight: 300, overflow: 'auto', color: 'white', backgroundColor: 'primary.main'}}
      >
        <CardContent>
          <Typography
            variant="h5"
          >
            {recipe.name}
          </Typography>
          <Divider variant="fullWidth" sx={{ borderBottomWidth: 5 }}/>
          <Typography
            variant="subtitle1"
          >
            {recipe.time}
          </Typography>
          <Typography variant="subtitle1">
            {recipe.notes ? recipe.notes : 'No notes for this recipe'}
          </Typography>
          <Grid container spacing={1}>
            <Grid
              size={6}
            >
              <Typography
                variant="subtitle2"
              >Ingredients
              </Typography>
              <IngredientList ingredients={recipe.ingredients}/>
            </Grid>
            <Grid size={6}>
              <Typography
                variant="subtitle2"
                >Nutrition
              </Typography>
              <NutritionList nutrition={recipe.nutrition}/>
            </Grid>
          </Grid>
        </CardContent>
        <Divider variant="fullWidth" sx={{ borderBottomWidth: 5, color: 'black',  }}/>
        <CardActions>
        <Button
            onClick={editRecipe}
          >Edit
          </Button>
          <Button
            onClick={() => { setDeletingRecipe(true) }}
            sx={{ background: '#bdbdbd' }}
          >Delete
          </Button>
        </CardActions>
      </Card>
      </ThemeProvider>
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
            editingRecipe={editingRecipe}
            setEditingRecipe={setEditingRecipe}
            recipe={recipe}
          />
        </DialogContent>
      </Dialog>
      </>
  )
};

export default RecipeCard;
