import { IUpdateProfileDTO } from "../dtos/IUpdateProfileDTO";
import { Profile } from "../entities/Profile";
import { IProfileRepository } from "./IProfileRepository";

export class InMemoryProfileRepository implements IProfileRepository {
  public repository: Profile[];

  constructor() {
    this.repository = [];
  }

  async findById(id: string): Promise<Profile | null> {
    const profile = this.repository.find((item) => item.id === id);
    return profile ?? null;
  }

  async update(entity: Profile, data: IUpdateProfileDTO): Promise<void> {
    const profileIndex = this.repository.findIndex(
      (item) => item.id === entity.id
    );

    if (profileIndex != -1) {
      const profile = this.repository[profileIndex];

      profile.bio = data.bio;
      profile.file = data.file;
    }
  }

  async create(data: Profile): Promise<void> {
    this.repository.push(new Profile(data.bio, data.file, data.user));
  }
}
