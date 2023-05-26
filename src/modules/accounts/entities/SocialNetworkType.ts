import { randomUUID } from "crypto";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("social_network_types")
export class SocialNetworkType {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @CreateDateColumn({ name: "created_at" })
  public createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt?: Date | null;

  constructor(name: string, description: string) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.deletedAt = null;
  }
}
