import { ICreateSocialNetworkDTO } from "../dtos/ICreateSocialNetworkDTO";
import { SocialNetwork } from "../entities/SocialNetwork";
import { ISocialNetworkRepository } from "./ISocialNetworkRepository";

export class InMemorySocialNetworkRepository
  implements ISocialNetworkRepository
{
  public repository: SocialNetwork[];

  constructor() {
    this.repository = [];
  }

  async findByUrl(url: string): Promise<SocialNetwork | null> {
    const socialNetwork = this.repository.find(
      (item) => item.socialNetworkUrl === url
    );
    return socialNetwork ?? null;
  }

  async findById(id: string): Promise<SocialNetwork | null> {
    const socialNetwork = this.repository.find((item) => item.id === id);
    return socialNetwork ?? null;
  }

  async update(
    entity: SocialNetwork,
    data: ICreateSocialNetworkDTO
  ): Promise<void> {
    const socialNetworkIndex = this.repository.findIndex(
      (item) => item.id === entity.id
    );

    if (socialNetworkIndex != -1) {
      const socialNetwork = this.repository[socialNetworkIndex];

      socialNetwork.profile = data.profile;
      socialNetwork.socialNetworkUrl = data.socialNetworkUrl;
      socialNetwork.socialNetworkType = data.socialNetworkType;
    }
  }

  async delete(entity: SocialNetwork): Promise<void> {
    const socialNetworkIndex = this.repository.findIndex(
      (item) => item.id === entity.id
    );

    if (socialNetworkIndex != -1) {
      this.repository[socialNetworkIndex].deletedAt = new Date();
    }
  }

  async create(data: SocialNetwork): Promise<void> {
    this.repository.push(
      new SocialNetwork(
        data.socialNetworkUrl,
        data.socialNetworkType,
        data.profile
      )
    );
  }
}
