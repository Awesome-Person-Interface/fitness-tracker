/* ===================================================================================
 *                              IMPORTS & INITIALIZATION
 * ----------------------------------------------------------------------------------*/
import express from 'express';
import axios from 'axios';             // must be imported for external requests
import dotenv from 'dotenv';
import verify from '../security/verify.js';
import { User, Events } from '../db/index.js'  // must be imported for database connection

dotenv.config();

const events = express.Router();
// ----------------------------------------------------------------------------------- //
// =================================================================================== //


/* ===================================================================================
 *                                  REQUEST HANDLERS
 * -----------------------------------------------------------------------------------
 *  POST    /                         => enables user to create a new event
 *  GET     /                         => enables the user get all of their events
 *  PATCH   /:id                      => enables the user to update info for an event
 *  DELETE  /:id                      => enables user to delete an event
 * ----------------------------------------------------------------------------------- */

/*
  Method: POST
  Endpoint: /users/events
  REQ.BODY: { event }
  REQ.USER: { _id }
*/
events.post('/', (req, res) => {
  // Grab the _id from request's user
  const { _id } = req.user;
  // Grab the event object from the request's body
  const { event } = req.body;
  // Add the id to the event object
  event.user_id = _id;
  // Create a new event object in the database
  Events.create(event)
    // Success:
    .then(() => {
      // Send Status: 201
      res.sendStatus(201);
    })
    // Failure:
    .catch((err) => {
      // Log error
      console.error(`POST :: INTERNAL :: create event for user #${_id}:`, err);
      // Send Status: 500
      res.sendStatus(500);
    });
});

/*
  Method: GET
  Endpoint: /users/events
  REQ.USER: { _id }
*/
events.get('/', (req, res) => {
  // Grab the _id from the request's user
  const { _id } = req.user;
  // Query the database for all of the events that belong to the user
  Events.find({ user_id: _id })
    // Success:
    .then((eventsArr) => {
      // Set Status: 200
      res.status(200);
      // Send back the events array
      res.send(eventsArr);
    })
    // Failure:
    .catch((err) => {
      // Log error
      console.error(`GET :: INTERNAL :: fill all events for user #${_id}:`, err);
    })
});

// ----------------------------------------------------------------------------------- //
// =================================================================================== //

export default events;