"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Journal_1 = require("./Journal");
const User_1 = require("./User");
const VerifyEmail_1 = require("./VerifyEmail");
const ResetPassword_1 = require("./ResetPassword");
const username = process.env.TYPE_ORM_USER_NAME;
const host = process.env.TYPE_ORM_HOST;
const password = process.env.TYPE_ORM_PASSWORD;
const database = process.env.TYPE_ORM_DATABASE;
console.log(password);
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host,
    port: 5432,
    username,
    password,
    database,
    synchronize: true,
    logging: true,
    entities: [Journal_1.Journal, User_1.User, VerifyEmail_1.VerifyEmail, ResetPassword_1.ResetPassword],
    subscribers: [],
    migrations: [],
    ssl: {
        rejectUnauthorized: false
    }
});
//# sourceMappingURL=initOrm.js.map