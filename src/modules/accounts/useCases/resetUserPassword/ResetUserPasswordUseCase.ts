import { hash } from "bcrypt";
import { ForbiddenException } from "../../../../errors/ForbiddenException";
import { IRecoveryTokenRepository } from "../../repositories/IRecoveryTokenRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  token: string;
  newPassword: string;
}

export class ResetUserPasswordUseCase {
  constructor(
    private recoveryTokenRepository: IRecoveryTokenRepository,
    private userRepository: IUserRepository
  ) {}
  async execute({ token, newPassword }: IRequest): Promise<void> {
    const recoveryToken = await this.recoveryTokenRepository.findByToken(token);

    if (!recoveryToken) {
      throw new ForbiddenException("user can not edit password!");
    }

    const currentDate = new Date();
    if (recoveryToken.expiredAt < currentDate) {
      throw new ForbiddenException("token has expired");
    }

    const user = await this.userRepository.findById(
      String(recoveryToken.user.id)
    );

    if (!user) {
      throw new ForbiddenException("invalid user id");
    }

    user.password = await hash(newPassword, 10);
    await this.userRepository.create(user);
  }
}
