import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { SocialNetwork } from "../../entities/SocialNetwork";
import { ISocialNetworkRepository } from "../../repositories/ISocialNetworkRepository";
import { ISocialNetworkTypeRepository } from "../../repositories/ISocialNetworkTypeRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  id: string;
  userId: string;
  socialNetworkUrl: string;
  socialNetworkTypeId: string;
}

export class UpdateSocialNetworkUseCase {
  constructor(
    private socialNetworkRepository: ISocialNetworkRepository,
    private socialNetWorkTypeRepository: ISocialNetworkTypeRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    id,
    userId,
    socialNetworkUrl,
    socialNetworkTypeId,
  }: IRequest): Promise<void> {
    const socialNetwork = await this.socialNetworkRepository.findById(id);

    if (!socialNetwork) {
      throw new NotFoundException("social network not found!");
    }

    const socialNetWorkType = await this.socialNetWorkTypeRepository.findById(
      socialNetworkTypeId
    );

    if (!socialNetWorkType) {
      throw new NotFoundException("social network type not found!");
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException("user not found!");
    }

    if (user.profile.socialNetworks) {
      const userAlreadyOwnsThisSocialNetworkType =
        user.profile.socialNetworks.find(
          (item) => item.socialNetworkType.id === socialNetworkTypeId
        );

      if (userAlreadyOwnsThisSocialNetworkType) {
        throw new BadRequestException(
          "user already owns this social network type!"
        );
      }
    }

    await this.socialNetworkRepository.update(
      socialNetwork,
      new SocialNetwork(socialNetworkUrl, socialNetWorkType, user.profile)
    );
  }
}
