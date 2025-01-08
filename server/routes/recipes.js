import express from 'express';
import axios from 'axios';
import { Recipes } from '../db/index.js';

// Create a new instance of express router
const recipes = express.Router();

// For POST requests to /users/recipes 
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

export default recipes;
