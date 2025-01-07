import mongoose from 'mongoose';
const { Schema } = mongoose;
import findOrCreate from 'mongoose-findorcreate' // importing this to register it to our schema

const MealSchema = new Schema({
  user_id: { type: String, ref: 'User' },
  routine_name: {type: String, required: false},
  food_items: Array
})

// Create the Meals using the schema
const Meals = mongoose.model('Meals', MealSchema)

module.exports = {
  Meals,
}