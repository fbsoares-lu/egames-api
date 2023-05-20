import bcrypt from "bcrypt";

import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../entities/User";
import { NotFoundException } from "../../../errors/NotFoundException";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface IUpdateUserRequest {
  id: string;
  name: string;
  email: string;
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

  async showUser(id: string): Promise<User | null> {
    const users = await this.userRepository.findById(id);
    return users;
  }

  async listUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser({
    email,
    name,
    password,
  }: ICreateUserRequest): Promise<void> {
    const encryptedPassword = await this.encryptedPassword(password);

    const user = new User(name, email, encryptedPassword);
    await this.userRepository.create(user);
  }

  async updateUser({ id, email, name }: IUpdateUserRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("user does not exist!");
    }

    if (user.email != email) {
      const emailAlreadyExists = await this.userRepository.findByEmail(email);

      if (emailAlreadyExists) {
        throw new Error("user does not exist!");
      }
    }

    const response = await this.userRepository.update(user, { email, name });
    return response;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException("user does not exist!");
    }

    this.userRepository.delete(user);
  }
}
