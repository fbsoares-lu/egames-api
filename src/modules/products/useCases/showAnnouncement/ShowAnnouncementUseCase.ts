import { Announcement } from "../../entities/Announcement";
import { IAnnouncementRepository } from "../../repositories/IAnnouncementRepository";

export class ShowAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(id: string): Promise<Announcement | null> {
    const announcement = await this.announcementRepository.findById(id);
    return announcement;
  }
}
