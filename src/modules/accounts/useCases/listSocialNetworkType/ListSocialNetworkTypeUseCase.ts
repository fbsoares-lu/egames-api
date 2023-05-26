import { SocialNetworkType } from "../../entities/SocialNetworkType";
import { ISocialNetworkTypeRepository } from "../../repositories/ISocialNetworkTypeRepository";

export class ListSocialNetworkTypeUseCase {
  constructor(private repository: ISocialNetworkTypeRepository) {}

  async execute(): Promise<SocialNetworkType[]> {
    const socialNetworkTypes = await this.repository.find();
    return socialNetworkTypes;
  }
}
