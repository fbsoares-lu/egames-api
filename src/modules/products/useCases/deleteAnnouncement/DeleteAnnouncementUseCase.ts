import { NotFoundException } from "../../../../errors/NotFoundException";
import { IUserRepository } from "../../../accounts/repositories/IUserRepository";
import { IFileRepository } from "../../../files/repositories/IFileRepository";
import { Announcement } from "../../entities/Announcement";
import { IAnnouncementRepository } from "../../repositories/IAnnouncementRepository";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IPaymentOptionsRepository } from "../../repositories/IPaymentOptionsRepository";

export class DeleteAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(id: string): Promise<void> {
    const announcement = await this.announcementRepository.findById(id);

    if (!announcement) {
      throw new NotFoundException("anouncement not found!");
    }

    await this.announcementRepository.delete(announcement);
  }
}
