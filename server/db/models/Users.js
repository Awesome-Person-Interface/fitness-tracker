import mongoose from 'mongoose';
const { Schema } = mongoose;
import findOrCreate from 'mongoose-findorcreate' // importing this to register it to our schema

// Initialize the user schema
const UserSchema = new Schema({
  _id: String,
  workouts: Array,
  nutrition: Array,
  username: { type: String, required: false },
  phone_num: { type: String, required: false },
  recov_email: { type: String, required: false },
  weight: { type: Number, required: false, default: null },
  goalWeight: { type: Number, required: false, default: null },
  weightProgress: [{type: Number}],
  liftWeight: { type: Number, required: false, default: null },
  goalLiftWeight: { type: Number, required: false, default: null },
  liftWeightProgress: [{type: Number}],
  speed: { type: Number, required: false, default: null },
  goalSpeed: { type: Number, required: false, default: null },
  speedProgress: [{type: Number}],

});
// Attach findOrCreate plugin to the UserSchema
UserSchema.plugin(findOrCreate);
// Create the Users model using the schema
const User = mongoose.model('User', UserSchema);

export default User;
