import { In, Repository } from "typeorm";

import { AppDataSource } from "../../../../infra/database";
import { IRoleRepository } from "../IRoleRepository";
import { Role } from "../../entities/Role";
import { ICreateRoleDTO } from "../../dtos/ICreateRoleDTO";

export class RoleRepository implements IRoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.repository.findOneBy({ name });
    return role;
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    const roles = await this.repository.findBy({ id: In(ids) });
    return roles;
  }

  async create(role: ICreateRoleDTO): Promise<void> {
    await this.repository.save(role);
  }
}
