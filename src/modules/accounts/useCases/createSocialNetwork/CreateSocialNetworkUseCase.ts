import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { SocialNetwork } from "../../entities/SocialNetwork";
import { ISocialNetworkRepository } from "../../repositories/ISocialNetworkRepository";
import { ISocialNetworkTypeRepository } from "../../repositories/ISocialNetworkTypeRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  userId: string;
  socialNetworkUrl: string;
  socialNetworkTypeId: string;
}

export class CreateSocialNetworkUseCase {
  constructor(
    private socialNetworkRepository: ISocialNetworkRepository,
    private socialNetWorkTypeRepository: ISocialNetworkTypeRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    userId,
    socialNetworkUrl,
    socialNetworkTypeId,
  }: IRequest): Promise<void> {
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

    if (!user.profile) {
      throw new BadRequestException("user does not have profile yet!");
    }

    if (user.profile.socialNetworks) {
      const userAlreadyOwnsThisSocialNetworkType =
        user.profile.socialNetworks.find(
          (item) => item.socialNetworkType === socialNetWorkType
        );

      if (userAlreadyOwnsThisSocialNetworkType) {
        throw new BadRequestException(
          "user already owns this social network type!"
        );
      }
    }

    const socialNetwork = await this.socialNetworkRepository.findByUrl(
      socialNetworkUrl
    );

    const socialNetworkAlreadyExists =
      socialNetwork && socialNetwork.socialNetworkType === socialNetWorkType;
    if (socialNetworkAlreadyExists) {
      throw new BadRequestException("social network already exists!");
    }

    await this.socialNetworkRepository.create(
      new SocialNetwork(socialNetworkUrl, socialNetWorkType, user.profile)
    );
  }
}
