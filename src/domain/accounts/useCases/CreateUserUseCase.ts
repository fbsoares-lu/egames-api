import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../entities/User";
import { EncryptedPassword } from "../../../helpers/EncryptedPassword";
import { BadRequestException } from "../../../errors/BadRequestException";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({
    email,
    name,
    password,
  }: ICreateUserRequest): Promise<void> {
    const encryptedPassword = await EncryptedPassword.handle(password);

    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new BadRequestException("email already exists!");
    }

    const user = new User(name, email, encryptedPassword);
    await this.userRepository.create(user);
  }
}
