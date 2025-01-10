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
  // Pass the elements of the promise array into the findIngredientId helper to get an array of ingredient ids
  return Promise.all(promiseArr)
  .then((responses) => {
    // Responses is an array of responses
    return findIngredientId(ingredients, responses);
  })
};

// Helper to find the closest name match to an ingredient
/***
 * I: Array of ingredients, Array of API responses
 * O: Ingredients object with the closest match to the ingredient name
 */
const findIngredientId = function(ingredients, responses) {
  // Storage array to hold ids
  const ingredientIds = [];
  // Indexes of the ingredients array will pair with the results at corresponding results array index
  ingredients.forEach((ingredient, index) => {
    // Lowercase the ingredient and trim whitespace
    const ingredientName = ingredient.name.toLowerCase().trim();
    // Grab the results array from each response
    const { results } = responses[index].data;
    console.log('NAMES: ', ingredientName, results[2].name.toLowerCase().trim());
    console.log('Results: ', results);
    for (let i = 0; i < results.length; i++) {
      // Lowercase and trim response name property
      const resName = results[i].name.toLowerCase().trim();
      if (ingredientName === resName) {
        ingredientIds.push(results[i].id);
        return;
      }
    }
  });
  return ingredientIds;
}

// Helper to get ingredient nutrition with the id
/***
 * I: Array of ingredient ids, Array of ingredient objects
 * O: Array of API responses
 * C: n/a
 * E: n/a
 */
const getIngredientInfo = function(ingredientIds, ingredients) {
  console.log('Info invoked!!!');
  // Create storage array to hold the promise returned by the API
  const promiseArr = [];
  ingredientIds.forEach((id, index) => {
    // Destructure from the corresponding index of ingredients
    const { amount, unit } = ingredients[index];
    // Build config to send to API
    const params = {
      apiKey: SPOONACULAR_KEY,
      amount,
      unit,
      number: 1
    }
    // Make axios request with the config and push onto the promiseArr
    promiseArr.push(axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information`, { params, }));
  })
  Promise.all(promiseArr)
    .then((values) => {
      setTimeout(() => {
        console.log('Promise array values', values[0].data.nutrition);
      })
    })
  return Promise.all(promiseArr);
}

// getIngredientInfo([1077], [{
//   name: 'Milk',
//   amount: '2',
//   unit: 'cups',
// }] )



export { getIngredientIds, getIngredientInfo };