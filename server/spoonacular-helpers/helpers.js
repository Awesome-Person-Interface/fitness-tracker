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
  // Create an array to hold the API response
  const promiseArr = [];
  // Need to send request forEach ingredient name
  ingredients.forEach((ingredient) => {
    // Build a configuration
    const params = {
      apiKey: SPOONACULAR_KEY,
      query: ingredient.name,
      number: 5,
    }
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
  // Return the value returned by Promise.all()
  return Promise.all(promiseArr)
    .then((responses) => {
      // Pass the response array into the calculateNutrients helper
      return calculateNutrition(responses)
    })
}

// Helper to calculate the nutrition facts of a recipe and add it to the database
/***
 * I: Array of responses from the database containing ingredient nutrition
 * O: n/a
 */
/* Note: To access the nutrition facts on the response
* Access the data property on the response (Object)
* Access the nutrition property on data (Object)
* Access the nutrients property on nutrition (Array of nutrition facts)
* => Nutrition array holds objects of nutrients: Example object
{ name: Calories, amount: 1135.62, unit": kcal, percentOfDailyNeeds: 56.78 },
*/
// Array to hold the nutrients I want from the database
const wantedNuts = ['calories', 'fat', 'sodium', 'carbohydrates', 'sugar', 'protein'];
const calculateNutrition = function(responses) {
  // Initialize an object to hold nutrients
  const nutrition = {
    calories: null,
    fat: null,
    unsaturated: null,
    sodium: null,
    carbohydrates: null,
    sugar: null,
    protein: null,
  };
  // Iterate over all the responses and access the results
  responses.forEach((response) => {
    // Grab the nutrients array
    const { nutrients } = response.data.nutrition;
    nutrients.forEach((nutrient) => {
      // Grab the nutrient name, lowerCase it and trim whitespace from ends
      const name = nutrient.name.toLowerCase().trim();
      // Change the name in the nutrient object to match the one we want
      nutrient.name = name;
      // Check if the ingredient is in the wantedNuts array (different for unsaturated)
      if(wantedNuts.includes(name)) {
      // Check if the property already has value
      if (nutrition[name]) {
        // If yes => Use the Nutrient addAmount method
          nutrition[name].addAmount(nutrient);
        } else {
          nutrition[name] = new Nutrient(nutrient);
        }
      } else if (name.split(' ').includes('unsaturated')) {
        // Make the nutrients name unsaturated
        nutrient.name = 'unsaturated';
        if (nutrition.unsaturated) {
          nutrition.unsaturated.addAmount(nutrient);
        } else {
          nutrition.unsaturated = new Nutrient(nutrient);
        }
      }
    });
  });
  // Create an array to push all nutrient objects onto
  const nutrientsArr = []
  for (let key in nutrition) {
    nutrientsArr.push(nutrition[key]);
  }
  return nutrientsArr;
}

// Constructor to build a Nutrient object
// Takes in a nutrient object
class Nutrient {
  constructor(nutrient) {
    this.name = nutrient.name,
    this.amount = nutrient.amount,
    this.unit = nutrient.unit
  }
  // Method to add to the Nutrient amount
  // Takes in another nutrientObject
  addAmount(addNutrient) {
    this.amount += addNutrient.amount;
  };
};

export { getIngredientIds, getIngredientInfo };