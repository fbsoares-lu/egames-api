import { ICreateSocialNetworkTypeDTO } from "../dtos/ICreateSocialNetworkTypeDTO";
import { SocialNetworkType } from "../entities/SocialNetworkType";
import { ISocialNetworkTypeRepository } from "./ISocialNetworkTypeRepository";

export class InMemorySocialNetworkTypeRepository
  implements ISocialNetworkTypeRepository
{
  public repository: SocialNetworkType[];

  constructor() {
    this.repository = [];
  }

  async find(): Promise<SocialNetworkType[]> {
    return this.repository;
  }

  async findById(id: string): Promise<SocialNetworkType | null> {
    const socialNetworkTypeIndex = this.repository.find(
      (item) => item.id === id
    );

    return socialNetworkTypeIndex ?? null;
  }

  async findByName(name: string): Promise<SocialNetworkType | null> {
    const socialNetworkType = this.repository.find(
      (item) => item.name === name
    );
    return socialNetworkType ?? null;
  }

  async update(
    entity: SocialNetworkType,
    data: ICreateSocialNetworkTypeDTO
  ): Promise<void> {
    const socialNetworkTypeIndex = this.repository.findIndex(
      (item) => item.id === entity.id
    );

    if (socialNetworkTypeIndex != -1) {
      this.repository[socialNetworkTypeIndex].name = data.name;
      this.repository[socialNetworkTypeIndex].description = data.description;
    }
  }

  async delete(entity: SocialNetworkType): Promise<void> {
    const socialNetworkTypeIndex = this.repository.findIndex(
      (item) => item.id === entity.id
    );

    if (socialNetworkTypeIndex != -1) {
      this.repository[socialNetworkTypeIndex].deletedAt = new Date();
    }
  }

  async create(role: ICreateSocialNetworkTypeDTO): Promise<void> {
    this.repository.push(new SocialNetworkType(role.name, role.description));
  }
}
