import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../modules/accounts/entities/User";
import { Users1684434930536 } from "./migrations/1684434930536-users";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: [Users1684434930536],
});
