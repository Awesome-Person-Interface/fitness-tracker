import React from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import IngredientList from './IngredientList.jsx';

function RecipeCard({ recipe }) {
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
          <Button>Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  )
};

export default RecipeCard;
