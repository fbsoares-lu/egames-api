import { randomUUID } from "crypto";

import { NotFoundException } from "../../../../errors/NotFoundException";
import { IRecoveryTokenRepository } from "../../repositories/IRecoveryTokenRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { RecoveryToken } from "../../entities/RecoveryToken";
import { IEMailProvider } from "../../../../providers/MailProvider/IEmailProvider";

export class SendForgotPasswordEmailUseCase {
  constructor(
    private useRepository: IUserRepository,
    private recoveryTokenRepository: IRecoveryTokenRepository,
    private emailProvider: IEMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.useRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException("user not found!");
    }

    await this.recoveryTokenRepository.deleteByUserId(String(user.id));

    const token = randomUUID();
    const recoveryToken = new RecoveryToken(token, user);

    await this.recoveryTokenRepository.create(recoveryToken);

    await this.emailProvider.sendEmail({
      to: email,
      subject: "Recovery password",
      body: `Recovery password", body: "Link to reset password: ${token}`,
    });
  }
}
