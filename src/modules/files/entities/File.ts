import { randomUUID } from "crypto";
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
} from "typeorm";

@Entity("files")
export class File {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public path: string;

  @CreateDateColumn({ name: "created_at" })
  public createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt?: Date | null;

  constructor(name: string, path: string) {
    this.id = randomUUID();
    this.name = name;
    this.path = path;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.deletedAt = null;
  }
}
