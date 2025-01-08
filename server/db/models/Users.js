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
  weight: { type: Number, required: false },
  liftWeight: { type: Number, required: false },
  speed: { type: Number, required: false },
  goalWeight: { type: Number, required: false },
  goalLiftWeight: { type: Number, required: false },
  goalSpeed: { type: Number, required: false },
});
// Attach findOrCreate plugin to the UserSchema
UserSchema.plugin(findOrCreate);
// Create the Users model using the schema
const User = mongoose.model('User', UserSchema);

export default User;
