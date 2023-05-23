import { ICreatePermissionDTO } from "../dtos/ICreatePermissionDTO";
import { Permission } from "../entities/Permission";

export abstract class IPermissionRepository {
  abstract create(permission: ICreatePermissionDTO): Promise<void>;
  abstract findByName(name: string): Promise<Permission | null>;
}
