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
  public path: string;

  @Column({ name: "original_name" })
  public originalName: string;

  @Column()
  public type: string;

  @CreateDateColumn({ name: "created_at" })
  public createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt?: Date | null;

  constructor(path: string, originalName: string, type: string) {
    this.id = randomUUID();
    this.path = path;
    this.type = type;
    this.originalName = originalName;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.deletedAt = null;
  }
}
