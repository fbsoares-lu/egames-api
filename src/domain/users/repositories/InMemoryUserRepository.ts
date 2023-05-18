import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";

interface IUserFormData {
  name: string;
  email: string;
  password: string;
}

export class InMemoryUserRepository implements IUserRepository {
  public repository: IUserFormData[];

  constructor() {
    this.repository = [];
  }

  async find(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async create(payload: IUserFormData): Promise<void> {
    this.repository.push(payload);
  }

  async update(user: User, payload: IUserFormData): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
