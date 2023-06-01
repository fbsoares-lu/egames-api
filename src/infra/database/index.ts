import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../../modules/accounts/entities/User";
import { Role } from "../../modules/accounts/entities/Role";
import { Permission } from "../../modules/accounts/entities/Permission";
import { Profile } from "../../modules/accounts/entities/Profile";
import { File } from "../../modules/files/entities/File";

import { CreateUsers1684434930536 } from "./migrations/1684434930536-CreateUsers";
import { CreateRoles1684854327461 } from "./migrations/1684854327461-CreateRoles";
import { CreatePermissions1684853466174 } from "./migrations/1684853466174-CreatePermissions";
import { CreateUsersRoles1684855025464 } from "./migrations/1684855025464-CreateUsersRoles";
import { CreateUsersPermissions1684855131899 } from "./migrations/1684855131899-CreateUsersPermissions";
import { CreateFile1684967371536 } from "./migrations/1684967371536-CreateFile";
import { UpdateFileColumns1685021581745 } from "./migrations/1685021581745-UpdateFileColumns";
import { CreateProfiles1685068911076 } from "./migrations/1685068911076-CreateProfiles";
import { CreateSocialNetworkTypes1685070133485 } from "./migrations/1685070133485-CreateSocialNetworkTypes";
import { CreateSocialNetworks1685070142131 } from "./migrations/1685070142131-CreateSocialNetworks";
import { SocialNetwork } from "../../modules/accounts/entities/SocialNetwork";
import { SocialNetworkType } from "../../modules/accounts/entities/SocialNetworkType";
import { AddProfileIdToUsers1685129751747 } from "./migrations/1685129751747-AddProfileIdToUsers";
import { AddProfileIdInSocialNetworks1685149053699 } from "./migrations/1685149053699-AddProfileIdInSocialNetworks";
import { CreateRecoveryTokens1685391675571 } from "./migrations/1685391675571-CreateRecoveryTokens";
import { RecoveryToken } from "../../modules/accounts/entities/RecoveryToken";
import { CreatePaymentOptions1685462044417 } from "./migrations/1685462044417-CreatePaymentOptions";
import { CreateCategories1685468564259 } from "./migrations/1685468564259-CreateCategories";
import { CreateAnnouncements1685468680471 } from "./migrations/1685468680471-CreateAnnouncements";
import { CreateAnnouncementPaymentOptions1685469241388 } from "./migrations/1685469241388-CreateAnnouncementPaymentOptions";
import { CreateAnnouncementCategories1685469440972 } from "./migrations/1685469440972-CreateAnnouncementCategories";
import { CreateAnnouncementFiles1685469623114 } from "./migrations/1685469623114-CreateAnnouncementFiles";
import { Announcement } from "../../modules/products/entities/Announcement";
import { PaymentOption } from "../../modules/products/entities/PaymentOption";
import { Category } from "../../modules/products/entities/Category";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME,
  entities: [
    User,
    Permission,
    Role,
    File,
    Profile,
    SocialNetwork,
    SocialNetworkType,
    RecoveryToken,
    Announcement,
    PaymentOption,
    Category,
  ],
  migrations: [
    CreateUsers1684434930536,
    CreatePermissions1684853466174,
    CreateRoles1684854327461,
    CreateUsersRoles1684855025464,
    CreateUsersPermissions1684855131899,
    CreateFile1684967371536,
    UpdateFileColumns1685021581745,
    CreateProfiles1685068911076,
    CreateSocialNetworkTypes1685070133485,
    CreateSocialNetworks1685070142131,
    AddProfileIdToUsers1685129751747,
    AddProfileIdInSocialNetworks1685149053699,
    CreateRecoveryTokens1685391675571,
    CreatePaymentOptions1685462044417,
    CreateCategories1685468564259,
    CreateAnnouncements1685468680471,
    CreateAnnouncementPaymentOptions1685469241388,
    CreateAnnouncementCategories1685469440972,
    CreateAnnouncementFiles1685469623114,
  ],
});
