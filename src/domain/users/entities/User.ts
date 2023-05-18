import { randomUUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date | null;

  constructor(name: string, email: string, password: string) {
    this.id = randomUUID();
    this.email = email;
    this.name = name;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.deletedAt = null;
  }
}
