import express from 'express';
import dotenv from 'dotenv';
import nutrition from './nutrition.js';             // nutrition router
import workouts from './workouts.js';               // workouts router
import routines from './routines.js';
import account from './account.js';
import events from './events.js';
import verify from '../security/verify.js';
import { User, Workouts, Meals } from '../db/index.js'
import Users from '../db/models/Users.js';

dotenv.config();
const goals = express.Router();

goals.get('/', (req, res) => {
  const { _id } = req.user;
  Users.findById(_id)
  .then((user) => {
    console.log(user)
  }).catch((err) => {
    console.error('Unable to GET user', err);
  });
});

goals.patch('/', (req, res) => {
  const { goals } = req.body
  const { _id } = req.user
  console.log('in the then')
  // console.log(req.user._id)
  Users.findOneAndUpdate({_id: _id}, goals)
  .then((newGoals) => {
    if (newGoals) {
      res.status(200).send(newGoals);
    } else {
      res.sendStatus(404)
    }
  }).catch((err) => {
    console.error('Unable to add goals', err);
    res.sendStatus(500);
  });
});
goals.delete('/', (req, res) => {
  const { value } = req.body;
  const { _id } = req.user;
  //--------------------------------------------------vvvv possibly just value w/o []
  Users.updateMany({_id: _id}, {$pull: {weightProgress: {value}}})
  .then(() => {
    res.status(200).send('Successful deletion')
  })
  .catch((err) => {
    console.error('Could not DELETE value', err);
    res.sendStatus(500);
  });
})
export default goals