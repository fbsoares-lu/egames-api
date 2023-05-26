import { ICreateProfileDTO } from "../dtos/ICreateProfileDTO";
import { ICreateRoleDTO } from "../dtos/ICreateRoleDTO";
import { IUpdateProfileDTO } from "../dtos/IUpdateProfileDTO";
import { Profile } from "../entities/Profile";

export abstract class IProfileRepository {
  abstract create(data: ICreateProfileDTO): Promise<void>;
  abstract update(profile: Profile, data: IUpdateProfileDTO): Promise<Profile>;
}
