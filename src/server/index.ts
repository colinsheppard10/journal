
import * as express from 'express';
import * as bodyParser from 'body-parser';
import router from './routes/routes';

const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3001;

// Configure App
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)

// start the server
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

export default app;
/*
  start server: 
    - tsc
    - node dist/index.js

  start client
    - yarn start
*/