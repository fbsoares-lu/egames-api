import { SocialNetworkTypeRepository } from "../../repositories/implementation/SocialNetworkTypeRepository";
import { UpdateSocialNetworkTypeController } from "./UpdateSocialNetworkTypeController";
import { UpdateSocialNetworkTypeUseCase } from "./UpdateSocialNetworkTypeUseCase";

const socialNetworkTypeRepository = new SocialNetworkTypeRepository();
const updateSocialNetworkTypeUseCase = new UpdateSocialNetworkTypeUseCase(
  socialNetworkTypeRepository
);
const updateSocialNetworkController = new UpdateSocialNetworkTypeController(
  updateSocialNetworkTypeUseCase
);

export { updateSocialNetworkController };
