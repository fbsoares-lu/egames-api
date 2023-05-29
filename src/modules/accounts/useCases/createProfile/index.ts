import { FileRepository } from "../../../files/repositories/implementation/FileRepository";
import { ProfileRepository } from "../../repositories/implementation/ProfileRepository";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import { CreateProfileController } from "./CreateProfileController";
import { CreateProfileUseCase } from "./CreateProfileUseCase";

const profileRepository = new ProfileRepository();
const fileRepository = new FileRepository();
const userRepository = new UserRepository();

const createProfileUseCase = new CreateProfileUseCase(
  profileRepository,
  fileRepository,
  userRepository
);
const createProfileController = new CreateProfileController(
  createProfileUseCase
);

export { createProfileController };
