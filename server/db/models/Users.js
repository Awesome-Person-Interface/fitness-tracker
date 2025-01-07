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
});
// Attach findOrCreate plugin to the UserSchema
UserSchema.plugin(findOrCreate);
// Create the Users model using the schema
const Users = mongoose.model('User', UserSchema);

module.exports = {
  Users,
};
