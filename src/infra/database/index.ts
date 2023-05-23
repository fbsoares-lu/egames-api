import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../../modules/accounts/entities/User";
import { Role } from "../../modules/accounts/entities/Role";
import { Permission } from "../../modules/accounts/entities/Permission";

import { CreateUsers1684434930536 } from "./migrations/1684434930536-CreateUsers";
import { CreateRoles1684854327461 } from "./migrations/1684854327461-CreateRoles";
import { CreatePermissions1684853466174 } from "./migrations/1684853466174-CreatePermissions";
import { CreatePermissionsRoles1684854551724 } from "./migrations/1684854551724-CreatePermissionsRoles";
import { CreateUsersRoles1684855025464 } from "./migrations/1684855025464-CreateUsersRoles";
import { CreateUsersPermissions1684855131899 } from "./migrations/1684855131899-CreateUsersPermissions";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME,
  entities: [User, Permission, Role],
  migrations: [
    CreateUsers1684434930536,
    CreatePermissions1684853466174,
    CreateRoles1684854327461,
    CreatePermissionsRoles1684854551724,
    CreateUsersRoles1684855025464,
    CreateUsersPermissions1684855131899,
  ],
});
