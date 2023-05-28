import { SocialNetworkRepository } from "../../repositories/implementation/SocialNetworkRepository";
import { DeleteSocialNetworkController } from "./DeleteSocialNetworkController";
import { DeleteSocialNetworkUseCase } from "./DeleteSocialNetworkUseCase";

const socialNetworkRepository = new SocialNetworkRepository();
const deleteSocialNetworkUseCase = new DeleteSocialNetworkUseCase(
  socialNetworkRepository
);
const deleteSocialNetworkController = new DeleteSocialNetworkController(
  deleteSocialNetworkUseCase
);

export { deleteSocialNetworkController };
