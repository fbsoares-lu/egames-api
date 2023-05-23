import { ICreateRoleDTO } from "../dtos/ICreateRoleDTO";
import { Role } from "../entities/Role";

export abstract class IRoleRepository {
  abstract create(role: ICreateRoleDTO): Promise<void>;
  abstract findByName(name: string): Promise<Role | null>;
}
