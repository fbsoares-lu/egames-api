import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

interface IUserFormData {
  name: string;
  email: string;
}

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async find(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id: id } });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email: email } });
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
  async delete(user: User): Promise<void> {
    user.deletedAt = new Date();
    await this.repository.save(user);
  }
}
