import express from 'express';
import axios from 'axios';
import Recipes from '../db/index.js';

// Create a new instance of express router
const recipes = express.Router();

// For POST requests to /users/recipes 
recipes.post('/');

export default recipes;
