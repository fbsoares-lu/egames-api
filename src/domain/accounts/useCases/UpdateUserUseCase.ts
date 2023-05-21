import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../entities/User";
import { NotFoundException } from "../../../errors/NotFoundException";
import { BadRequestException } from "../../../errors/BadRequestException";

interface IUpdateUserRequest {
  id: string;
  name: string;
  email: string;
}

export class UpdateUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ id, email, name }: IUpdateUserRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException("user does not exist!");
    }

    if (user.email != email) {
      const emailAlreadyExists = await this.userRepository.findByEmail(email);

      if (emailAlreadyExists) {
        throw new BadRequestException("user does not exist!");
      }
    }

    const response = await this.userRepository.update(user, { email, name });
    return response;
  }
}
