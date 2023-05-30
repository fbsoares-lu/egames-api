import { RecoveryTokenRepository } from "../../repositories/implementation/RecoveryTokenRepository";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import { ResetUserPasswordController } from "./ResetUserPasswordController";
import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

const userRepository = new UserRepository();
const recoveryTokenRepository = new RecoveryTokenRepository();

const resetUserPasswordUseCase = new ResetUserPasswordUseCase(
  recoveryTokenRepository,
  userRepository
);

const resetUserPasswordController = new ResetUserPasswordController(
  resetUserPasswordUseCase
);

export { resetUserPasswordController };
