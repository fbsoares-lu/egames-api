import bcrypt from "bcrypt";

import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../entities/User";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface IUpdateUserRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async encryptedPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createUser({
    email,
    name,
    password,
  }: ICreateUserRequest): Promise<void> {
    const encryptedPassword = await this.encryptedPassword(password);

    const user = new User(name, email, encryptedPassword);

    console.log(user);

    await this.userRepository.create(user);
  }

  async updateUser({ id, email, name }: IUpdateUserRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("user does not exist!");
    }

    const response = await this.userRepository.update(user, { email, name });
    return response;
  }
}
