import { randomUUID } from "crypto";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("recovery_tokens")
export class RecoveryToken {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public token: string;

  @Column({ name: "expired_at" })
  public expiredAt: Date;

  @CreateDateColumn({ name: "created_at" })
  public createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt?: Date | null;

  constructor(token: string, user: User) {
    this.id = randomUUID();
    this.token = token;
    this.user = user;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: User;

  @BeforeInsert()
  updateExpiredAt() {
    let currentDate = new Date();
    const setTwentyMinutes = currentDate.getTime() + 20 * 60 * 1000;

    this.expiredAt = new Date(setTwentyMinutes);
  }
}
