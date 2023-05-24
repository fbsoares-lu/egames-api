import { ICreateRoleDTO } from "../dtos/ICreateRoleDTO";
import { Role } from "../entities/Role";
import { IRoleRepository } from "./IRoleRepository";

export class InMemoryRoleRepository implements IRoleRepository {
  public repository: Role[];

  constructor() {
    this.repository = [];
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    const rolesFound: Role[] = [];

    for (var i = 0; i < ids.length; i++) {
      for (var j = 0; j < this.repository.length; j++) {
        if (this.repository[j].name === ids[i]) {
          rolesFound.push(this.repository[i]);
        }
      }
    }

    return rolesFound;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = this.repository.find((item) => item.name === name);
    return role ?? null;
  }

  async create(role: ICreateRoleDTO): Promise<void> {
    this.repository.push(new Role(role.name, role.description));
  }
}
