import mongoose from 'mongoose';
const { Schema } = mongoose;

// Initialize the ingredients schema
const IngredientSchema = new Schema({
  name: {type: String },
  amount: {type: String },
  unit: { type: String },
});
// Initialize nutrient schema to hold nutrition name and unit
const NutrientSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true, },
  unit: { type: String, required: true },
})

// Initialize the recipes schema
  // Use the IngredientSchema for the ingredients field in recipes
  // Declaring an array of objects that follow the IngredientSchema
const RecipeSchema = new Schema({
  userId: { type: String, ref: 'User' },
  name: { type: String, required: true},
  serves: { type: String, },
  time: { type: String, },
  ingredients: [IngredientSchema],
  image: { type: String, default: null},
  notes: { type: String },
  nutrition: [NutrientSchema],
});
// Create the recipes model using RecipeSchema
const Recipes = mongoose.model('Recipe', RecipeSchema);
// Export the recipes model
export default Recipes;
