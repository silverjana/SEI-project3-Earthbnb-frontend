![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Preparing a MERN App for Deployment on Heroku

Make sure you have worked through the guide 'mongodb-cloud.md' before following these steps.

The aim of this guide is to prepare the app for deployment to Heroku, to do this we need to run (frontend and backend) from the same port (the backend one). As it stands we run them separately, this is great for development, it allows us access to lots of benefits like hot reloading and being able to test changes quickly, but this is not that state it will be deployed in.

## Frontend

- Add a `config.js` to `client/src` and add the following code:

  ```js
  const DEV_API_URL = "http://localhost:4000";
  const PROD_API_URL = process.env.REACT_APP_API_URL;
  export const API_URL =
    process.env.NODE_ENV === "production" ? PROD_API_URL : DEV_API_URL;
  ```

* To your .env file add the following - replacing with your own backend URL.

```
REACT_APP_API_URL=myherokubackendurl.herokuapp.com/api
```

- Wherever you are making an API call replace now the hard-coded string with the exported API_URL from `config.js`.

- Navigate to the client directory and run the terminal command `npm run build`. This will have compile your frontend source code and generate a “build” directory inside the frontend folder.

- Add a file called `_redirects` to the `public` directory. To ensure the `BrowserRouter` works as expected, add the following code:

  ```sh
  /* /index.html 200
  ```

## Backend

- In your `package.json` add the following command to your scripts:

  ```json
  {
    "start": "node server.js"
  }
  ```

- In the root, add the “dotenv” package by running `npm i dotenv`, this will allow our application to read values from a `.env` file. Also run `npm i cors` which will allow us to access our backend once the frontend is deployed

- To your your `consts.js` file, update the variables like the following.

```js
import dotenv from "dotenv";

dotenv.config();

const consts = {
  DB_CONNECTION_STRING:
    process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/tapas",
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || "JWT_SECRET",
};

console.log(">>>>>>>> Environment variables defined as followed:");
console.log(consts);
export default consts;
```

- The updated declarations ensure that if environment variables are declared (in this case the `JWT_SECRET` and the `PORT`) your app will use those. If not, it will use the defined default values.

- In the root create a `.env` file, `touch .env` and add values for the following.

```sh
PORT=4000
SECRET=myappsecret
DB_CONNECTION_STRING=mongodb+srv://YOUR_MONGO_ATLAS_USERNAME:YOUR_MONGO_ATLAS_PASSWORD@cluster0.1mdpo.mongodb.net/NAME_OF_YOUR_DB?retryWrites=true&w=majority
```

- Take care when adding the `DB_CONNECTION_STRING` section above, the majority of this should have been provided to you when following the steps to set up your Mongo Atlas Instance, ensure you have add your own correct values over the placeholders in the example above. You can call the database whatever it is called on your local, e.g. `pokemondb`.

- To test if this has worked, attempt to run your database seed command, likely `node utils/seedDb.js`. If this fails, check your connection string is correct. You can also check if this has worked in the Mongo Atlas console. Navigate to the “collections” tab of your cluster and you should be able to see your data. We have essentially transferred your database to a cloud instance, that it can now be deployed with.

- The app now needs to be prepared to serve your backend. Update `server.js` to be like the following. See the commented lines for the additions (bear in mind your may not be identical to mine, read the comments to work out where you need to add things)

- Your `server.js` should look like the following:

```js
import router from "./views/router.js";
import express from "express";
import connectToDb from "./utils/db.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import dotenv from "dotenv";
import CONSTS from "./consts.js";

// ! Move my code into a function.
async function startServer() {
  const app = express();
  dotenv.config();

  app.use(cors()); // <-- use middleware to allow CORS

  app.use(express.json());

  app.use(logger);

  app.use(router);

  // ! Error handling is the last piece of middleware
  app.use(errorHandler);

  // within the helpers.js file, make sure the connectToDb function
  // actually uses the connection string for the cloud database from the env variable
  await connectToDb();

  app.listen(CONSTS.PORT, () =>
    console.log(`Express server running on Port ${CONSTS.PORT}`)
  );
}

startServer();
```
