import { SocialNetworkRepository } from "../../repositories/implementation/SocialNetworkRepository";
import { SocialNetworkTypeRepository } from "../../repositories/implementation/SocialNetworkTypeRepository";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import { CreateSocialNetworkController } from "./CreateSocialNetworkController";
import { CreateSocialNetworkUseCase } from "./CreateSocialNetworkUseCase";

const socialNetworkRepository = new SocialNetworkRepository();
const socialNetworkTypeRepository = new SocialNetworkTypeRepository();
const userRepository = new UserRepository();

const createSocialNetworkUseCase = new CreateSocialNetworkUseCase(
  socialNetworkRepository,
  socialNetworkTypeRepository,
  userRepository
);
const createSocialNetworkController = new CreateSocialNetworkController(
  createSocialNetworkUseCase
);

export { createSocialNetworkController };
