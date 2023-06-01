import { NotFoundException } from "../../../../errors/NotFoundException";
import { IUserRepository } from "../../../accounts/repositories/IUserRepository";
import { IFileRepository } from "../../../files/repositories/IFileRepository";
import { Announcement } from "../../entities/Announcement";
import { IAnnouncementRepository } from "../../repositories/IAnnouncementRepository";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IPaymentOptionsRepository } from "../../repositories/IPaymentOptionsRepository";

export interface IRequest {
  id: string;
  status: boolean;
  announcementName: string;
  announcementState: string;
  announcementDescription: string;
  announcementPrice: number;
  isExchangeable: boolean;
  categoryIds: string[];
  paymentOptionIds: string[];
  fileIds: string[];
}

export class UpdateAnnouncementUseCase {
  constructor(
    private announcementRepository: IAnnouncementRepository,
    private categoriesRepository: ICategoriesRepository,
    private paymentOptionsRepository: IPaymentOptionsRepository,
    private fileRepository: IFileRepository
  ) {}

  async execute({
    id,
    status,
    announcementDescription,
    announcementState,
    announcementName,
    announcementPrice,
    isExchangeable,
    paymentOptionIds,
    categoryIds,
    fileIds,
  }: IRequest): Promise<void> {
    const announcement = await this.announcementRepository.findById(id);

    if (!announcement) {
      throw new NotFoundException("anouncement not found!");
    }

    const files = await this.fileRepository.findByIds(fileIds);
    const categories = await this.categoriesRepository.findByIds(categoryIds);
    const paymentOptions = await this.paymentOptionsRepository.findByIds(
      paymentOptionIds
    );

    announcement.files = files;
    announcement.categories = categories;
    announcement.paymentOptions = paymentOptions;
    await this.announcementRepository.update(announcement, {
      status,
      announcementDescription,
      announcementState,
      announcementName,
      announcementPrice,
      isExchangeable,
    });
  }
}
