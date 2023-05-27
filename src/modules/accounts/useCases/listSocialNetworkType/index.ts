import { SocialNetworkTypeRepository } from "../../repositories/implementation/SocialNetworkTypeRepository";
import { ListSocialNetworkTypeController } from "./ListSocialNetworkTypeController";
import { ListSocialNetworkTypeUseCase } from "./ListSocialNetworkTypeUseCase";

const socialNetworkTypeRepository = new SocialNetworkTypeRepository();
const listSocialNetworkTypeUseCase = new ListSocialNetworkTypeUseCase(
  socialNetworkTypeRepository
);
const listSocialNetworkTypeController = new ListSocialNetworkTypeController(
  listSocialNetworkTypeUseCase
);

export { listSocialNetworkTypeController };
