import { ICreateSocialNetworkDTO } from "../dtos/ICreateSocialNetworkDTO";
import { SocialNetwork } from "../entities/SocialNetwork";

export abstract class ISocialNetworkRepository {
  abstract findById(id: string): Promise<SocialNetwork | null>;
  abstract findByUrl(url: string): Promise<SocialNetwork | null>;
  abstract create(data: SocialNetwork): Promise<void>;
  abstract update(
    entity: SocialNetwork,
    data: ICreateSocialNetworkDTO
  ): Promise<void>;
  abstract delete(entity: SocialNetwork): Promise<void>;
}
