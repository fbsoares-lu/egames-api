import { In, Repository } from "typeorm";

import { AppDataSource } from "../../../../infra/database";
import { ICreatePermissionDTO } from "../../dtos/ICreatePermissionDTO";
import { Permission } from "../../entities/Permission";
import { IPermissionRepository } from "../IPermissionRepository";

export class PermissionRepository implements IPermissionRepository {
  private repository: Repository<Permission>;

  constructor() {
    this.repository = AppDataSource.getRepository(Permission);
  }

  async findByName(name: string): Promise<Permission | null> {
    const permission = await this.repository.findOneBy({ name });
    return permission;
  }

  async create(permission: ICreatePermissionDTO): Promise<void> {
    await this.repository.save(permission);
  }

  async findByIds(ids: string[]): Promise<Permission[]> {
    const permissions = await this.repository.findBy({ id: In(ids) });
    return permissions;
  }
}
