import { Repository } from "typeorm";
import { ICreateSocialNetworkTypeDTO } from "../../dtos/ICreateSocialNetworkTypeDTO";
import { SocialNetworkType } from "../../entities/SocialNetworkType";
import { ISocialNetworkTypeRepository } from "../ISocialNetworkTypeRepository";
import { AppDataSource } from "../../../../infra/database";

export class SocialNetworkTypeRepository
  implements ISocialNetworkTypeRepository
{
  private repository: Repository<SocialNetworkType>;

  constructor() {
    this.repository = AppDataSource.getRepository(SocialNetworkType);
  }

  async find(): Promise<SocialNetworkType[]> {
    const socialNetworkTypes = await this.repository.find();
    return socialNetworkTypes;
  }

  async findById(id: string): Promise<SocialNetworkType | null> {
    const socialNetworkType = await this.repository.findOneBy({ id });
    return socialNetworkType;
  }

  async findByName(name: string): Promise<SocialNetworkType | null> {
    const socialNetworkType = await this.repository.findOneBy({ name });
    return socialNetworkType;
  }

  async update(
    entity: SocialNetworkType,
    data: ICreateSocialNetworkTypeDTO
  ): Promise<void> {
    entity.name = data.name;
    entity.description = data.description;

    await this.repository.save(entity);
  }

  async create(data: ICreateSocialNetworkTypeDTO): Promise<void> {
    await this.repository.save(data);
  }

  async delete(socialNetworkType: SocialNetworkType): Promise<void> {
    socialNetworkType.deletedAt = new Date();
    await this.repository.save(socialNetworkType);
  }
}
