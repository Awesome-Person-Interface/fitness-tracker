import mongoose from 'mongoose';
import Meals from './models/Meals.js';
import User from './models/Users.js';
import Workouts from './models/Workouts.js';

// establish connection to mongoose
// before we can do this, we need to declare a database name and a path
mongoose.connect('mongodb://127.0.0.1:27017/fitness-tracker')
  .then(() => {
    console.log('>> Attempting to connect to database fitness-tracker <<')
  })
  .catch(() => {
    console.log('>> Error on connection to database fitness-tracker <<')
  })

const db = mongoose.connection;

// we still need to export this and the connection to mongoose
export {
  Meals,
  User,
  Workouts,
  db,
};
