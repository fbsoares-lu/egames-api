import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../entities/User";
import { NotFoundException } from "../../../errors/NotFoundException";

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async showUser(id: string): Promise<User | null> {
    const users = await this.userRepository.findById(id);
    return users;
  }

  async listUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException("user does not exist!");
    }

    this.userRepository.delete(user);
  }
}
