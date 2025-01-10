import express from 'express';
import axios from 'axios';
import { Recipes } from '../db/index.js';
import { getIngredientIds, getIngredientInfo } from '../spoonacular-helpers/helpers.js';

// Create a new instance of express router
const recipes = express.Router();

recipes.post('/test', (req, res) => {
  // Grab the ingredients list from req.body
  const { ingredients } = req.body.recipe.formValues;
  // Pass the ingredients into the helper
  getIngredientIds(ingredients)
  .then((ids) => {
    // Get the ingredient info for the returned ids
    getIngredientInfo(ids, ingredients)
    .then((results) => { 
      res.status(200).send(results);
    })
  }).catch((err) => {
    console.error('Error in the helper function: ', err);
    res.sendStatus(500);
  })
})
// For GET requests to /user/recipes
recipes.get('/', (req, res) => {
  // Get al the recipes from the database
  Recipes.find({})
    .then((recipes) => {
      res.status(200).send(recipes);
    }).catch((err) => {
      console.error('Error GETting recipes from the database: ', err);
      res.sendStatus(500);
    });
})
// For POST requests to /user/recipes
recipes.post('/', (req, res) => {
  // Grab the config from the req body
  const { recipe } = req.body;
  // Add the recipe to the database
  Recipes.create(recipe)
    .then(() => {
      res.sendStatus(201);
    }).catch((err) => {
      console.error('Error creating the recipe in the database: ', err);
      res.sendStatus(500);
    });
});
// For DELETE requests to /user/recipes/:id
recipes.delete('/:id', (req, res) => {
  // Grab the id from the req params
  const { id } = req.params;
  // Delete the recipe with the id from the database
  Recipes.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      console.error('Error deleting recipe from database: ', err);
      res.sendStatus(500);
    });
});

export default recipes;
