import {
  IPaginationRequest,
  IPaginationResponse,
  PaginationResponse,
} from "../../../helpers/PaginationResponse";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  public repository: User[];

  constructor() {
    this.repository = [];
  }

  async findByEmail(email: string) {
    const user = this.repository.find((item) => item.email === email);
    return user!;
  }

  async find(page: number, pageSize: number): Promise<IPaginationResponse> {
    const users = this.repository;

    const paginationResponse = PaginationResponse.handle({
      data: users,
      page,
      pageSize,
      total: users.length,
    });
    return paginationResponse;
  }

  async findById(id: string) {
    const user = this.repository.find((item) => item.id === id);
    return user!;
  }

  async create(payload: User): Promise<void> {
    this.repository.push(
      new User(payload.name, payload.email, payload.password)
    );
  }

  async update(user: User, payload: User) {
    const userIndex = this.repository.findIndex((item) => item.id === user.id);

    this.repository[userIndex] = payload;
    return this.repository[userIndex];
  }

  async delete(user: User): Promise<void> {
    const userIndex = this.repository.findIndex((item) => item.id === user.id);
    this.repository[userIndex].deletedAt = new Date();
  }
}
