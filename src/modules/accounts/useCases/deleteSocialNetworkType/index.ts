import { SocialNetworkTypeRepository } from "../../repositories/implementation/SocialNetworkTypeRepository";
import { DeleteSocialNetworkTypeController } from "./DeleteSocialNetworkTypeController";
import { DeleteSocialNetworkTypeUseCase } from "./DeleteSocialNetworkTypeUseCase";

const socialNetworkTypeRepository = new SocialNetworkTypeRepository();
const deleteSocialNetworkTypeUseCase = new DeleteSocialNetworkTypeUseCase(
  socialNetworkTypeRepository
);
const deleteSocialNetworkTypeController = new DeleteSocialNetworkTypeController(
  deleteSocialNetworkTypeUseCase
);

export { deleteSocialNetworkTypeController };
