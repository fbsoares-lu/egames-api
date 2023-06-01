import { randomUUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../accounts/entities/User";
import { PaymentOption } from "./PaymentOption";
import { Category } from "./Category";
import { File } from "../../files/entities/File";

@Entity("announcements")
export class Announcement {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public status: boolean;

  @Column({ name: "announcement_name" })
  public announcementName: string;

  @Column({ name: "announcement_state" })
  public announcementState: string;

  @Column({ name: "announcement_description" })
  public announcementDescription: string;

  @Column({ name: "announcement_price" })
  public announcementPrice: number;

  @Column({ name: "is_exchangeable" })
  public isExchangeable: boolean;

  @CreateDateColumn({ name: "created_at" })
  public createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt?: Date | null;

  constructor(
    status: boolean,
    announcementName: string,
    announcementDescription: string,
    announcementState: string,
    announcementPrice: number,
    isExchangeable: boolean
  ) {
    this.id = randomUUID();
    this.status = status;
    this.announcementName = announcementName;
    this.announcementState = announcementState;
    this.announcementDescription = announcementDescription;
    this.announcementPrice = announcementPrice;
    this.isExchangeable = isExchangeable;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }

  @ManyToOne(() => User, (user) => user.announcements)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: User;

  @ManyToMany(() => PaymentOption)
  @JoinTable({
    name: "announcement_payment_options",
    joinColumns: [{ name: "announcement_id" }],
    inverseJoinColumns: [{ name: "payment_option_id" }],
  })
  paymentOptions: PaymentOption[];

  @ManyToMany(() => Category)
  @JoinTable({
    name: "announcement_categories",
    joinColumns: [{ name: "announcement_id" }],
    inverseJoinColumns: [{ name: "category_id" }],
  })
  categories: Category[];

  @ManyToMany(() => File)
  @JoinTable({
    name: "announcement_categories",
    joinColumns: [{ name: "announcement_id" }],
    inverseJoinColumns: [{ name: "file_id" }],
  })
  files: File[];
}
