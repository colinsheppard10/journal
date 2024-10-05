import * as express from "express";
import * as bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import publicRoutes from "./routes/publicRoutes";
import { AppDataSource } from "./entity/initOrm";
import {
  initWebSocketServer,
  insertData,
} from "./controllers/webSocketController";
import * as dotenv from "dotenv";
import path = require("path");
import cors = require("cors");

dotenv.config();
const app = express();
app.use(cors())

// Initialize typeOrm
AppDataSource.initialize()
  .then(() => {
    // set the port of our application.
    // process.env.PORT lets the port be set by Heroku
    let port: any = 3001;

    // Configure App
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // main router uses authMiddleware
    // publicRoutes does not use authMiddleware
    app.use('/public',publicRoutes);
    app.use('/api', authRoutes);

    if (true) {
      /*
        issues with serving react bundle
        1. authMiddleware gets set on all endpoints
        2. react router needs the hacky solution below
        3. react router with nested paths breaks
      */
        // add middlewares
        port = process.env.PORT || 3001;
        app.use(express.static(path.join(__dirname, "../../client", "build")));

        app.use((req, res, next) => {
          console.log(`req.url: ${req.url}`)
          res.sendFile(path.join(__dirname, "../../client", "build", "index.html"));
        });

    }

    // start the server
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  })
  .then(async () => {
    await initWebSocketServer();
  })
  .catch((err) => {
    console.log(err);
  });

/*
  TODO: Add this job to periodically save journal entries from socket connection
*/
// insertData();
export default app;
/*
  start server: 
    - tsc
    - node dist/index.js

  start client
    - yarn start
*/
