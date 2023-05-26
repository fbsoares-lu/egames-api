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
} from "typeorm";
import { SocialNetworkType } from "./SocialNetworkType";

@Entity("social_networks")
export class SocialNetwork {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public socialNetworkUrl: string;

  @CreateDateColumn({ name: "created_at" })
  public createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt?: Date | null;

  constructor(socialNetworkUrl: string) {
    this.id = randomUUID();
    this.socialNetworkUrl = socialNetworkUrl;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.deletedAt = null;
  }

  @OneToOne(() => SocialNetworkType)
  @JoinColumn({
    name: "social_network_type_id",
    referencedColumnName: "id",
  })
  socialNetWorkType: SocialNetworkType;
}
