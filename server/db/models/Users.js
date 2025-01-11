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
  // -------------------- GOAL SCHEMAS ---------------------------
  // display starting attribute which will double as the updater for the graph
  weight: { type: Number, required: false, default: null },
  // display goal , but not at the top  or bottom of the graph, to leave room for improvement
  goalWeight: { type: Number, required: false, default: null },
  // progress array to keep track of update numbers over time perhaps  as tuples (field:[{type:Array}])
  weightProgress: [{type: Array, required: false, default: [[1, 2], [2, 5.5], [3, 2], [5, 8.5], [8, 1.5], [10, 5]]}],
  weightEndpoint: {type: Number},
  liftWeight: { type: Number, required: false, default: null },
  goalLiftWeight: { type: Number, required: false, default: null },
  liftWeightProgress: [{type: Array}],
  liftWeightEndpoint: {type: Array},
  speed: { type: Number, required: false, default: null },
  goalSpeed: { type: Number, required: false, default: null },
  speedProgress: [{type: Array}],
  speedEndpoint: {type: Number},
  //---------------------------------------------------------------

});
// Attach findOrCreate plugin to the UserSchema
UserSchema.plugin(findOrCreate);
// Create the Users model using the schema
const User = mongoose.model('User', UserSchema);

export default User;
