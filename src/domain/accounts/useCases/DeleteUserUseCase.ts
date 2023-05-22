import { NotFoundException } from "../../../errors/NotFoundException";
import { IUserRepository } from "../repositories/IUserRepository";

interface IRequest {
  id: string;
}

export class DeleteUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ id }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException("user does not exists!");
    }

    await this.userRepository.delete(user);
  }
}
