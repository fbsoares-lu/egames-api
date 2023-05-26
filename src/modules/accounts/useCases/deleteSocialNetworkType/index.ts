import { SocialNetworkTypeRepository } from "../../repositories/implementation/SocialNetworkTypeRepository";
import { DeleteSocialNetworkTypeController } from "./DeleteSocialNetworkTypeController";
import { DeleteSocialNetworkTypeUseCase } from "./DeleteSocialNetworkTypeUseCase";

const socialNetworkTypeRepository = new SocialNetworkTypeRepository();
const deleteSocialNetworkTypeUseCase = new DeleteSocialNetworkTypeUseCase(
  socialNetworkTypeRepository
);
const deleteSocialNetworkController = new DeleteSocialNetworkTypeController(
  deleteSocialNetworkTypeUseCase
);

export { deleteSocialNetworkController };
