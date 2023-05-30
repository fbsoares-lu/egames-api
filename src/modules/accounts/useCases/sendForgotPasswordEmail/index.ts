import { EtherealMailProvider } from "../../../../providers/MailProvider/implementations/EtherealMailProvider";
import { RecoveryTokenRepository } from "../../repositories/implementation/RecoveryTokenRepository";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import { SendForgotPasswordEmailController } from "./SendForgotPasswordEmailController";
import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordEmailUseCase";

const userRepository = new UserRepository();
const recoveryTokenRepository = new RecoveryTokenRepository();
const emailProvider = new EtherealMailProvider();

const sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
  userRepository,
  recoveryTokenRepository,
  emailProvider
);
const sendForgotPasswordEmailController = new SendForgotPasswordEmailController(
  sendForgotPasswordEmailUseCase
);

export { sendForgotPasswordEmailController };
