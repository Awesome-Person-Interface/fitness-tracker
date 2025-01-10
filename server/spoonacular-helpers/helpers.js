import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SPOONACULAR_KEY = process.env.FOOD_API_KEY;

// Helper function to grab ingredient nutrition/id from Spoonacular
/***
 * I: Array of ingredient objects {name: 'ingredientName'}
 * O: An array of nutrition from the ingredients
 * C: n/a
 * E: n/a
 */
// Need to get the ingredient id and then the nutrition separately
const getIngredientIds = function(ingredients) {
  console.log('Invoked the helper from helper file');
  // Create an array to hold the API response
  const promiseArr = [];
  // Create an array to hold the ids we found
  const ingredientIds = [];
  // Need to send request forEach ingredient name
  ingredients.forEach((ingredient) => {
    // Build a configuration
    const params = {
      apiKey: SPOONACULAR_KEY,
      query: ingredient.name,
      number: 5,
    }
    console.log('Params in test POST: ', params);
    // Push the request response onto the promiseArr
    promiseArr.push(axios.get('https://api.spoonacular.com/food/ingredients/search', { params, }));
  })
  // Return the promise from Promise.all()
  return Promise.all(promiseArr);
};

export { getIngredientIds };
