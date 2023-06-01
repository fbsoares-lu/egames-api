import { Repository } from "typeorm";
import { AppDataSource } from "../../../../infra/database";
import { IAnnouncementRepository } from "../IAnnouncementRepository";
import { Announcement } from "../../entities/Announcement";
import {
  IPaginationResponse,
  PaginationResponse,
} from "../../../../helpers/PaginationResponse";

export class AnnouncementRepository implements IAnnouncementRepository {
  private repository: Repository<Announcement>;

  constructor() {
    this.repository = AppDataSource.getRepository(Announcement);
  }

  async find(page: number, pageSize: number): Promise<IPaginationResponse> {
    const [result, total] = await this.repository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return PaginationResponse.handle({
      data: result,
      page,
      total,
      pageSize,
    });
  }

  async findById(id: string): Promise<Announcement | null> {
    return await this.repository.findOneBy({ id });
  }

  async create(data: Announcement): Promise<void> {
    await this.repository.save(data);
  }

  async update(data: Announcement, payload: Announcement): Promise<void> {
    data.status = payload.status;
    data.announcementName = payload.announcementName;
    data.announcementDescription = payload.announcementDescription;
    data.announcementPrice = payload.announcementPrice;
    data.isExchangeable = payload.isExchangeable;
    await this.repository.save(data);
  }

  async delete(data: Announcement): Promise<void> {
    data.deletedAt = new Date();
    await this.repository.save(data);
  }
}
