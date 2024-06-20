import "reflect-metadata";
import { DataSource } from "typeorm";
import { Journal } from "./Journal";
import { User } from "./User";
import { VerifyEmail } from "./VerifyEmail";
import { ResetPassword } from "./ResetPassword";
import { Computation } from "./computation/Computation";

const username = process.env.TYPE_ORM_USER_NAME;
const host = process.env.TYPE_ORM_HOST;
const password = process.env.TYPE_ORM_PASSWORD;
const database = process.env.TYPE_ORM_DATABASE;

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port: 5432,
  username,
  password,
  database,
  synchronize: true,
  logging: true,
  entities: [Journal, User, VerifyEmail, ResetPassword, Computation],
  subscribers: [],
  migrations: [],
  ssl: {
    rejectUnauthorized: false
  }
});
