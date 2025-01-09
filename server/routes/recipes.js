import express from 'express';
import axios from 'axios';
import { Recipes } from '../db/index.js';

// Create a new instance of express router
const recipes = express.Router();

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
