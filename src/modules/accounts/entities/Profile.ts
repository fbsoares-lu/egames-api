import { randomUUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Permission } from "./Permission";
import { Role } from "./Role";
import { File } from "../../files/entities/File";
import { User } from "./User";
import { SocialNetwork } from "./SocialNetwork";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public bio: string;

  @CreateDateColumn({ name: "created_at" })
  public createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt?: Date | null;

  constructor(bio: string, file: File, user: User) {
    this.id = randomUUID();
    this.bio = bio;
    this.file = file;
    this.user = user;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.deletedAt = null;
  }

  @OneToOne(() => File)
  @JoinColumn({
    name: "file_id",
    referencedColumnName: "id",
  })
  file: File;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: User;

  @OneToMany(() => SocialNetwork, (socialNetwork) => socialNetwork.profile)
  socialNetworks: SocialNetwork[];
}
