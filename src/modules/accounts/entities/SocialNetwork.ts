import { randomUUID } from "crypto";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { SocialNetworkType } from "./SocialNetworkType";
import { Profile } from "./Profile";

@Entity("social_networks")
export class SocialNetwork {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column({ name: "social_network_url" })
  public socialNetworkUrl: string;

  @CreateDateColumn({ name: "created_at" })
  public createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt?: Date | null;

  constructor(
    socialNetworkUrl: string,
    socialNetworkType: SocialNetworkType,
    profile: Profile
  ) {
    this.id = randomUUID();
    this.profile = profile;
    this.socialNetworkUrl = socialNetworkUrl;
    this.socialNetworkType = socialNetworkType;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.deletedAt = null;
  }

  @OneToOne(() => SocialNetworkType)
  @JoinColumn({
    name: "social_network_type_id",
    referencedColumnName: "id",
  })
  socialNetworkType: SocialNetworkType;

  @ManyToOne(() => Profile, (profile) => profile.socialNetworks)
  @JoinColumn({
    name: "profile_id",
    referencedColumnName: "id",
  })
  profile: Profile;
}
