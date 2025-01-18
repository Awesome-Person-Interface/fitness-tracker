# Project "Vitality" 
##### (pending; formerly fitness-tracker)
**Track workouts, plan meals, live healthy.**

# Project Description
**Vitality is an application designed to help end-users track workouts and nutrition plans so that they can meet their health goals. It has two primary features, workouts and nutritional data, which allow for a user to search for and track this type of information within their account.** 

# Installation

1. Perform an `npm install` to download dependencies for this project.

2. Acquire API keys for the following resources and store in your `env` file:
    - FOOD_API_KEY: https://spoonacular.com/food-api/console#Dashboard
    - API_NINJA_KEY: https://www.api-ninjas.com/api/exercises
  
3. Acquire a Google Client ID, Google Client Secret, and setup Google OAuth within Google Cloud Console. If you aren't familiar with this process, here is relevant [documentation](https://developers.google.com/identity/protocols/oauth2). Ensure that you store this information in your `env` file.
    - GOOGLE_CLIENT_ID: From Google Cloud Console.
    - GOOGLE_CLIENT_SECRET: From Google Cloud Console.
    - SERVER_SESSION_SECRET: Whatever secret you would like Express to use.

4. Additional OPTIONAL Information to include in your .env:
    - BASE_URL: If you're using something different than `http://localhost`
    - PORT: If you want to use a different port then `8080`
    - MONGO_URI: If you're using a different URI for MongoDB than your local Mongo storage

5. Under the `OAuth Consent Screen` register your email, as well as other team member emails, as test users. If this isn't done, then you will be refused at the entry point to the application.

6. Once you have registered an `OAuth Consent Screen`, ensure that the `OAuth 2.0 Client IDs` is setup correctly. Ensure that the website is declared as an Authorized Javascript Origin and that you specify Authorized Redirect URIs as necessary.

7. If necessary, update the `auth.js` Passport strategy as necessary. You shouldn't need to update many parts of this if your `env` file has been setup correctly. An example of how your strategy should be setup is provided [here](https://www.passportjs.org/packages/passport-google-oauth20/).

# Startup

We have developed several Node.js scripts for this project, with the two primary scripts being `npm start` (to start the server) and `npm run build` (to have Webpack transpile JSX). It is important to note that, by design, the server will not start listening on a port and it will not successfully start unless a connection can be established to the database. If you are experiencing issues here, ensure that your Mongoose and MongoDB processes are running in the background.

There are two other additional scripts that are particularly useful if you have exceeded your API quota. There exists a mock-data folder which can be updated to reflect a set of example data. 

  - The `npm run seed` will attempt to populate the database with five users; it is intentionally designed to _randomly_ populate User fields with data. This is intended to help with edge conditions and to help identify problems; if it is not desired then the `seedDatabase.js` file can be modified to meet testing needs.

  - The `npm run reap` will attempt to delete/clear the database of all users. It's more akin to a _purge_ but it is only intended to be used during testing. **As a warning, do not use the `npm run reap` command in cases where you don't want to delete items from the database. This command should eventually be disabled on deployment, or it risks us accidentally purging the database.**

```
  "start": "nodemon server/index.js",
  "build": "webpack",
  "seed": "node mock-data/seedDatabase.js",
  "reap": "node mock-data/reapDatabase.js"
```

# How It Works

## Frameworks, Libraries, Packages, & Plugins

|      Client       |      Server      |     Database     |           Miscellaneous          |
| ----------------  | ---------------- | ---------------- | -------------------------------- |
| React & React-DOM | Node.js          | MongoDB          | Mongoose / find-or-create plugin |
| MaterialUI        | Express          | Mongoose         | Babel & Babel Loader             |
| Axios             | Passport         |                  | Express / express-session        |
| Webpack           | Google OAuth 2.0 |                  | dotenv                           |
| React-Router      | Webpack          |                  | eslint                           |
| Day.js            | Nodemon          |                  | MaterialUI                       |
| React-Big-Calendar|                  |                  |                                  |

### Client

The client uses Webpack with Babel in order to transpile and bundle our components. In order to make our application neat, legible, and user-friendly we have opted to implement MaterialUI for handling the interface. Axios is used in the top-level components to perform requests to our server.

### Server

Our server imports several items for use, including our authentication strategy and database connection, which is available in the `auth.js` file and the `server/db/index.js` file respectively. The server imports these files so that they can be used within an Express instance. Most routes are secured with Passport and the Google OAuth 2.0 strategy, with a few _intended_ exceptions. The server `routes` folder contains all routes associated with specific endpoints.

The `server/index.js` expects for all sensitive information to be stored in the process environment; **never** store our secrets or API keys within a public config file. This would open our website to malign actors and it risks exposing user information that is intended to remain private.

### Database

A critical import is our connection to MongoDB / Mongoose from the `server/db/index.js` file. This file initializes a `UserSchema`, registers this schema to use the methods provided by the `find-or-create` plugin, and exports this alongside a connection to the server. Additionally a `RoutineSchema` is initialized that is used within workout components; this schema is associated with a `user_id` property which acts as a foreign key (indicates which user the saved routine belongs to).
- All the models can be found inside the models folder on the server side.

## Entry to Application & Authentication
1. The entry point to our application is a Google Sign-in; this is handled by Passport with the Google OAuth 2.0 strategy. Navigation to routes within our server are prohibited if you have not or cannot be authenticated with this strategy.

2. Once a user logs in with the Google Sign-In, their user information is found (or initialized as empty) within our database. The database used for this project is called `fitness-tracker`. After the user is successfully created, subsequent requests will use a `req.user._id` property (created by Passport) to perform CRUD operations for that respective user.

3. The main application view is handled by a switch statement; the `view` is controlled as a state. Requests for a different view speak with the server, and the server attempts session validation and passport authentication during every request. If the user is authenticated and their session is valid, then the user is allowed to navigate through the website. If at any point there is deviant or malicious activity, our intent is to force a user signout and then force that user to log in again.

## Features for Application End-Users

1. **Account & Dashboard**
    - C - Create a new account.
    - R - Read stored data for their account across components, and in the dashboard view.
    - U - Update stored workouts and nutritional information. 
    - U - Updated stored profile information.
    - D - Delete their account and data.

2. **Workouts Management**
    - R - Read workouts for the current account, as well as reading data from external APIs.
    - C / U - Create and update new workouts for the user.
    - D / U - Delete (update) existing workouts for the user.

3. **Nutrition Management**
    - R - Read saved foods and nutritional information for the current account, as well as reading data from external APIs.
    - C / R - Read workouts and nutritional information to generate recommended meals for restoring calories.
    - C / U - Create and update existing foods and nutritional information for the user.
    - D / U - Delete (update) existing existing foods and nutritional information for the user.

4. **Routines Management**
    - C - Create a new routine with a specified name.
    - R - Read any routine associated with the current user.
    - U - Update any routine's name for the current user.
    - D - Delete any routine of specified name for the user.

5. **Goal Tracking**
    - C/U - Allow a user to set a goal weight and goal weight
    - We did not make as much progress with this feature as we would have liked
        - There is a lot of opportunity for expansion or improvement within the feature

6. **Recipe Management**
    - C - Create a custom recipe with a custom name, amount of people it serves, cook time, notes, and ingredients.
    - R - View the custom recipes along with the nutrition facts of the recipe
    - U - Update a recipe's information, including changing the ingredient measurements (Change will be reflected in nutrition facts upon saving)
    - D - Delete a custom recipe
    - Users are given a form to create a recipe upon hitting the create recipe button
    - Max number of ingredient fields is 10 (User is given an alert when trying to insert an 11th ingredient field)
    - Editing a recipe uses the same form as creating but the fields will render with the values of the recipes being added
        - The logic for this is is handled in the RecipeForm component, it can be confusing because of the amount of conditional logic used.
        - Quick breakdown: When the Recipe Card edit button is clicked it opens a dialog box with the RecipeForm component. The value state value of editingRecipe is set to true, which is the main value used in the conditional rendering of the form inside of the RecipeForm component.

5. **Calendar Assistant**
    - C - Create new events using previously stored data or custom data.
    - R - Populate the calendar with previously created events
    - U - Update any field in any event previously created
    - D - Delete any event previously created
    - Calendar displays details on any event when clicked.
    - User can drag across multiple dates for multi-day events.
    - User can choose between an all-day event or specific time event when creating an event for a day
    - Choosing a category populates the title and description of an event for the user.

## Future Development
> What we would have done given the time
- Be able to set multiple calendar events at the same time
    - ie: Set multiple breakfast events for every day of the week with only one event creation
- Consolidate search exercises view and user's exercises view into one view
    - Have the exercises render once the muscle group is clicked, rather than requiring the search button click
- Set a fail safe for ingredients that are inserted into a recipe that Spoonacular API does not recognize
    - WARNING: A misspelled or completely empty ingredient field will cause the site to break (I believe)
- Set up a prettier dashboard view that is more user friendly and pleasing to look at

## Current Bugs
- Attempting to add an empty field to the pantry will insert HTML into the users nutrition document, effectively breaking the site and causing the need for the users table to be dropped before the site will work again
- There is no fail safe for an unknown / empty ingredient field being inserted into a custom recipe form
    - An unknown ingredient will break the site, an empty one will show as empty on the recipe card
    - You will probably be best served setting this up in the Spoonacular helpers
- Logout button has no functionality
- Delete account feature is incomplete
    - This is commented out in the AccountPage component (199-201)
## Spoonacular Helpers
- Helpers needed to be set up to retrieve ingredient nutrition because of the how the Spoonacular API works
- The ingredient id must be retrieved from the API before a request can be made for the ingredients nutrition facts
- server/spoonacular-helpers/helpers.js has a decent amount of pseudocode that attempts to explain how the process works
- A single recipe's nutrition is calculated at once using these helpers
- Pay attention to the Recipe model and how nutrition facts are stored

## Contributors
- [Code-Blooded](https://github.com/os-ims-Code-Blooded)
  - Benjamin Long ([benlongcp](https://github.com/benlongcp))
  - Justin Sandrock ([sandrockjustin](https://github.com/sandrockjustin))
  - Jeremy Hernandez ([jhernandez504](https://github.com/jhernandez504))
- [Awesome Person Interface](https://github.com/Awesome-Person-Interface)
  - Tyler Meyer ([tymey](https://github.com/tymey))
  - Evan Loria ([evanloria4](https://github.com/evanloria4))
  - Stefan Poole ([steviepee](https://github.com/steviepee))
