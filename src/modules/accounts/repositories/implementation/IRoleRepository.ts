import { Repository } from "typeorm";

import { AppDataSource } from "../../../../infra/database";
import { IRoleRepository } from "../IRoleRepository";
import { Role } from "../../entities/Role";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

export class UserRepository implements IRoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }

  async create(role: ICreateUserDTO): Promise<void> {
    await this.repository.save(role);
  }
}
