import { SocialNetworkRepository } from "../../repositories/implementation/SocialNetworkRepository";
import { SocialNetworkTypeRepository } from "../../repositories/implementation/SocialNetworkTypeRepository";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import { UpdateSocialNetworkController } from "./UpdateSocialNetworkController";
import { UpdateSocialNetworkUseCase } from "./UpdateSocialNetworkUseCase";

const socialNetworkRepository = new SocialNetworkRepository();
const socialNetworkTypeRepository = new SocialNetworkTypeRepository();
const userRepository = new UserRepository();

const updateSocialNetworkUseCase = new UpdateSocialNetworkUseCase(
  socialNetworkRepository,
  socialNetworkTypeRepository,
  userRepository
);
const updateSocialNetworkController = new UpdateSocialNetworkController(
  updateSocialNetworkUseCase
);

export { updateSocialNetworkController };
