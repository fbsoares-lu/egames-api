import { Repository } from "typeorm";
import { AppDataSource } from "../../../../infra/database";
import { Profile } from "../../entities/Profile";
import { IProfileRepository } from "../IProfileRepository";
import { IUpdateProfileDTO } from "../../dtos/IUpdateProfileDTO";

export class ProfileRepository implements IProfileRepository {
  private repository: Repository<Profile>;

  constructor() {
    this.repository = AppDataSource.getRepository(Profile);
  }

  async findById(id: string): Promise<Profile | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async create(data: Profile): Promise<void> {
    await this.repository.save(data);
  }

  async update(profile: Profile, data: IUpdateProfileDTO): Promise<void> {
    profile.bio = data.bio;
    profile.file = data.file;

    await this.repository.save(profile);
  }
}
