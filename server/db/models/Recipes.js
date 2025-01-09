import mongoose from 'mongoose';
const { Schema } = mongoose;

// Initialize the ingredients schema
const IngredientSchema = new Schema({
  name: {type: String },
  amount: {type: String },
  unit: { type: String },
});
// Initialize the recipes schema
  // Use the iIngredientSchema for the ingredients field in recipes
  // Declaring an array of objects that follow the IngredientSchema
const RecipeSchema = new Schema({
  name: { type: String, required: true},
  serves: { type: String, },
  time: { type: String, },
  ingredients: [IngredientSchema],
  image: { type: String, default: null},
  notes: { type: String }
});
// Create the recipes model using RecipeSchema
const Recipes = mongoose.model('Recipe', RecipeSchema);
// Export the recipes model
export default Recipes;
