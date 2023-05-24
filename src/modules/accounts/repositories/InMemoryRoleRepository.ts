import { ICreateRoleDTO } from "../dtos/ICreateRoleDTO";
import { Role } from "../entities/Role";
import { IRoleRepository } from "./IRoleRepository";

export class InMemoryRoleRepository implements IRoleRepository {
  public repository: Role[];

  constructor() {
    this.repository = [];
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<Role | null> {
    const role = this.repository.find((item) => item.name === name);
    return role ?? null;
  }

  async create(role: ICreateRoleDTO): Promise<void> {
    this.repository.push(new Role(role.name, role.description));
  }
}
