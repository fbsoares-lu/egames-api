import { ICreateSocialNetworkTypeDTO } from "../dtos/ICreateSocialNetworkTypeDTO";
import { SocialNetworkType } from "../entities/SocialNetworkType";

export abstract class ISocialNetworkTypeRepository {
  abstract find(): Promise<SocialNetworkType[]>;
  abstract findById(id: string): Promise<SocialNetworkType | null>;
  abstract findByName(name: string): Promise<SocialNetworkType | null>;
  abstract create(data: ICreateSocialNetworkTypeDTO): Promise<void>;
  abstract update(
    entity: SocialNetworkType,
    data: ICreateSocialNetworkTypeDTO
  ): Promise<void>;
  abstract delete(entity: SocialNetworkType): Promise<void>;
}
