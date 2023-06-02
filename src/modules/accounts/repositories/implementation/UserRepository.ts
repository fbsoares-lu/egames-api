import { Repository } from "typeorm";
import { AppDataSource } from "../../../../infra/database";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import {
  IPaginationResponse,
  PaginationResponse,
} from "../../../../helpers/PaginationResponse";
import { Role } from "../../entities/Role";
import { Permission } from "../../entities/Permission";
import { Profile } from "../../entities/Profile";

interface IUserFormData {
  name: string;
  email: string;
}

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async find(page: number, pageSize: number): Promise<IPaginationResponse> {
    const [result, total] = await this.repository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return PaginationResponse.handle({
      data: result,
      page,
      total,
      pageSize,
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { id },
      relations: [
        "permissions",
        "roles",
        "profile",
        "profile.file",
        "profile.socialNetworks",
        "profile.socialNetworks.socialNetworkType",
        "announcements",
        "announcements.paymentOptions",
        "announcements.categories",
        "announcements.files",
      ],
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email: email },
    });

    return user;
  }

  async create(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async update(user: User, payload: IUserFormData): Promise<User> {
    user.name = payload.name;
    user.email = payload.email;

    await this.repository.save(user);
    return user;
  }

  async save(
    user: User,
    roles: Role[],
    permissions: Permission[]
  ): Promise<void> {
    user.permissions = permissions;
    user.roles = roles;

    await this.repository.save(user);
  }

  async delete(user: User): Promise<void> {
    user.deletedAt = new Date();
    await this.repository.save(user);
  }

  async saveProfile(user: User, profile: Profile): Promise<void> {
    user.profile = profile;
    await this.repository.save(user);
  }
}
