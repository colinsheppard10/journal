
import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3001;

// Configure App
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/api', (req, res) => {
  console.log(`got a request`);
  res.send({response: 'ok'});
});

// start the server
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

/*
  start server: 
    - tsc
    - node dist/index.js

  start client
    - yarn start
*/