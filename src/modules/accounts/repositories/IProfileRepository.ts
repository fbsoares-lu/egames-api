import { IUpdateProfileDTO } from "../dtos/IUpdateProfileDTO";
import { Profile } from "../entities/Profile";

export abstract class IProfileRepository {
  abstract findById(id: string): Promise<Profile | null>;
  abstract create(data: Profile): Promise<void>;
  abstract update(profile: Profile, data: IUpdateProfileDTO): Promise<void>;
}
