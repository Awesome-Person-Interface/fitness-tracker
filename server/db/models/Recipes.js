import mongoose from 'mongoose';
const { Schema } = mongoose;

// Initialize the ingredients schema
const IngredientSchema = new Schema({
  name: {type: String },
  amount: {type: String },
  unit: { type: String },
});
// Initialize nutritient schema to hold nutrition name and unit
const NutrientSchema = new Schema({
  amount: { type: Number, required: true, },
  unit: { type: String, required: true },
})
// Initialize nutrition schema to go on the RecipeSchema 
const NutritionSchema = new Schema({
  calories: NutrientSchema,
  totalFat: NutrientSchema,
  unSaturated: NutrientSchema,
  sodium: NutrientSchema,
  carbs: NutrientSchema,
  sugar: NutrientSchema,
  protein: NutrientSchema,
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
  notes: { type: String },
  nutrition: NutritionSchema,
});
// Create the recipes model using RecipeSchema
const Recipes = mongoose.model('Recipe', RecipeSchema);
// Export the recipes model
export default Recipes;
