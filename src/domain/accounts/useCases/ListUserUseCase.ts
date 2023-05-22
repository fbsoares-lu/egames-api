import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

export class ListUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
