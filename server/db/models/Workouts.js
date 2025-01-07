import mongoose from 'mongoose';
const { Schema } = mongoose;

const WorkoutSchema = new Schema({
	user_id: { type: String, ref: 'User'},
	routine_name: String,
	exercises: Array,
});
// Create the Workouts model using the schema
const Workouts = mongoose.model('Workout', WorkoutSchema);

module.exports = {
  Workouts,
};
