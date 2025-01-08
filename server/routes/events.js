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
 *  GET     /                         => enables the user to switch to meals view
 *  GET     /all                      => retrieves all meals associated with user
 *  POST    /create                   => enables user to create a new meal
 *  DELETE  /delete                   => enables user to delete a meal
 * ----------------------------------------------------------------------------------- */



// ----------------------------------------------------------------------------------- //
// =================================================================================== //

export default events;