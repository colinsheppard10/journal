"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes_1 = require("./routes/authRoutes");
const publicRoutes_1 = require("./routes/publicRoutes");
const initOrm_1 = require("./entity/initOrm");
const webSocketController_1 = require("./controllers/webSocketController");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const app = express();
// Initialize typeOrm
initOrm_1.AppDataSource.initialize()
    .then(() => {
    // set the port of our application
    // process.env.PORT lets the port be set by Heroku
    let port = 3001;
    // Configure App
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // main router uses authMiddleware
    // publicRoutes does not use authMiddleware
    app.use('/public', publicRoutes_1.default);
    app.use('/api', authRoutes_1.default);
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
            console.log(`req.url: ${req.url}`);
            res.sendFile(path.join(__dirname, "../../client", "build", "index.html"));
        });
    }
    // start the server
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    });
})
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, webSocketController_1.initWebSocketServer)();
}))
    .catch((err) => {
    console.log(err);
});
/*
  TODO: Add this job to periodically save journal entries from socket connection
*/
// insertData();
exports.default = app;
/*
  start server:
    - tsc
    - node dist/index.js

  start client
    - yarn start
*/
//# sourceMappingURL=index.js.map