import { ICreateRoleDTO } from "../dtos/ICreateRoleDTO";
import { Permission } from "../entities/Permission";
import { IPermissionRepository } from "./IPermissionRepository";

export class InMemoryPermissionRepository implements IPermissionRepository {
  public repository: Permission[];

  constructor() {
    this.repository = [];
  }
  async findByIds(ids: string[]): Promise<Permission[]> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<Permission | null> {
    const role = this.repository.find((item) => item.name === name);
    return role ?? null;
  }

  async create(role: ICreateRoleDTO): Promise<void> {
    this.repository.push(new Permission(role.name, role.description));
  }
}
