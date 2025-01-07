import mongoose from 'mongoose';
import {User, Workouts, Meals, db} from '../server/db/index.js'

db.on('open', () => {

  User.deleteMany({})
    .then(() => {
      return Workouts.deleteMany({})
    })
    .then(() => {
      return Meals.deleteMany({});
    })
    .then(() => {
      console.log(
        `Database purge completed; no items exist should exist in database.`
      )
    })
    .catch((error) => {
      console.log(
        `Failure on database purge; have you modified this process?`
      )
    })

  db.dropCollection('users');
  db.dropCollection('workouts');
  db.dropCollection('meals');
})