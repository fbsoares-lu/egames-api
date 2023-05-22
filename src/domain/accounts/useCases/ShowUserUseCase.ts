import { NotFoundException } from "../../../errors/NotFoundException";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  id: string;
}

export class ShowUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException("user does not exists!");
    }

    return user;
  }
}
