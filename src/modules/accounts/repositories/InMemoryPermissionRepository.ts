import { ICreateRoleDTO } from "../dtos/ICreateRoleDTO";
import { Permission } from "../entities/Permission";
import { IPermissionRepository } from "./IPermissionRepository";

export class InMemoryPermissionRepository implements IPermissionRepository {
  public repository: Permission[];

  constructor() {
    this.repository = [];
  }
  async findByIds(ids: string[]): Promise<Permission[]> {
    const permissionsFound: Permission[] = [];

    for (var i = 0; i < ids.length; i++) {
      for (var j = 0; j < this.repository.length; j++) {
        if (this.repository[j].name === ids[i]) {
          permissionsFound.push(this.repository[i]);
        }
      }
    }

    return permissionsFound;
  }

  async findByName(name: string): Promise<Permission | null> {
    const permission = this.repository.find((item) => item.name === name);
    return permission ?? null;
  }

  async create(role: ICreateRoleDTO): Promise<void> {
    this.repository.push(new Permission(role.name, role.description));
  }
}
