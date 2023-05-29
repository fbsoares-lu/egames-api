import { FileRepository } from "../../../files/repositories/implementation/FileRepository";
import { ProfileRepository } from "../../repositories/implementation/ProfileRepository";
import { UpdateProfileController } from "./UpdateProfileController";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";

const profileRepository = new ProfileRepository();
const fileRepository = new FileRepository();

const updateProfileUseCase = new UpdateProfileUseCase(
  profileRepository,
  fileRepository
);
const updateProfileController = new UpdateProfileController(
  updateProfileUseCase
);

export { updateProfileController };
