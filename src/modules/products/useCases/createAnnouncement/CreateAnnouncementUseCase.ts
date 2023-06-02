import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { User } from "../../../accounts/entities/User";
import { IUserRepository } from "../../../accounts/repositories/IUserRepository";
import { IFileRepository } from "../../../files/repositories/IFileRepository";
import { Announcement } from "../../entities/Announcement";
import { Category } from "../../entities/Category";
import { IAnnouncementRepository } from "../../repositories/IAnnouncementRepository";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IPaymentOptionsRepository } from "../../repositories/IPaymentOptionsRepository";

export interface IRequest {
  userId: string;
  announcementName: string;
  announcementState: string;
  announcementDescription: string;
  announcementPrice: number;
  isExchangeable: boolean;
  categoryIds: string[];
  paymentOptionIds: string[];
  fileIds: string[];
}

export class CreateAnnouncementUseCase {
  constructor(
    private announcementRepository: IAnnouncementRepository,
    private userRepository: IUserRepository,
    private categoriesRepository: ICategoriesRepository,
    private paymentOptionsRepository: IPaymentOptionsRepository,
    private fileRepository: IFileRepository
  ) {}

  async execute({
    userId,
    announcementDescription,
    announcementName,
    announcementState,
    announcementPrice,
    isExchangeable,
    paymentOptionIds,
    categoryIds,
    fileIds,
  }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException("user not found!");
    }

    const files = await this.fileRepository.findByIds(fileIds);
    const categories = await this.categoriesRepository.findByIds(categoryIds);
    const paymentOptions = await this.paymentOptionsRepository.findByIds(
      paymentOptionIds
    );

    const announcement = new Announcement(
      announcementName,
      announcementDescription,
      announcementState,
      announcementPrice,
      isExchangeable
    );

    announcement.user = user;
    announcement.files = files;
    announcement.categories = categories;
    announcement.paymentOptions = paymentOptions;
    await this.announcementRepository.create(announcement);
  }
}
