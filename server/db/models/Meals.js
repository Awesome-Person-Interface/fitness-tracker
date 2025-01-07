import mongoose from 'mongoose';
const { Schema } = mongoose;

const MealSchema = new Schema({
  user_id: { type: String, ref: 'User' },
  routine_name: {type: String, required: false},
  food_items: Array,
})

// Create the Meals using the schema
const Meals = mongoose.model('Meal', MealSchema);

export default Meals;
