import { Repository } from "typeorm";
import { AppDataSource } from "../../../../infra/database";
import { ICreateSocialNetworkDTO } from "../../dtos/ICreateSocialNetworkDTO";
import { SocialNetwork } from "../../entities/SocialNetwork";
import { ISocialNetworkRepository } from "../ISocialNetworkRepository";

export class SocialNetworkRepository implements ISocialNetworkRepository {
  private repository: Repository<SocialNetwork>;

  constructor() {
    this.repository = AppDataSource.getRepository(SocialNetwork);
  }

  async findByUrl(url: string): Promise<SocialNetwork | null> {
    return await this.repository.findOneBy({ socialNetworkUrl: url });
  }

  async findById(id: string): Promise<SocialNetwork | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async create(data: SocialNetwork): Promise<void> {
    await this.repository.save({
      profile: data.profile,
      socialNetworkUrl: data.socialNetworkUrl,
      socialNetworkType: data.socialNetworkType,
    });
  }

  async update(
    entity: SocialNetwork,
    data: ICreateSocialNetworkDTO
  ): Promise<void> {
    entity.profile = data.profile;
    entity.socialNetworkUrl = data.socialNetworkUrl;
    entity.socialNetworkType = data.socialNetworkType;

    await this.repository.save(entity);
  }

  async delete(entity: SocialNetwork): Promise<void> {
    entity.deletedAt = new Date();
    await this.repository.save(entity);
  }
}
