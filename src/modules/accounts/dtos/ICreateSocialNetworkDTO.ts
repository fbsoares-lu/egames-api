import { Profile } from "../entities/Profile";
import { SocialNetworkType } from "../entities/SocialNetworkType";

export interface ICreateSocialNetworkDTO {
  socialNetworkUrl: string;
  socialNetworkType: SocialNetworkType;
  profile: Profile;
}
