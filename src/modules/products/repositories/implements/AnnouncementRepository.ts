import { Repository } from "typeorm";
import { AppDataSource } from "../../../../infra/database";
import { IAnnouncementRepository } from "../IAnnouncementRepository";
import { Announcement } from "../../entities/Announcement";
import {
  IPaginationResponse,
  PaginationResponse,
} from "../../../../helpers/PaginationResponse";
import { IUpdateAnnouncementDTO } from "../../dtos/IUpdateAnnouncementDTO";

export class AnnouncementRepository implements IAnnouncementRepository {
  private repository: Repository<Announcement>;

  constructor() {
    this.repository = AppDataSource.getRepository(Announcement);
  }

  async find(
    page: number,
    pageSize: number,
    search?: string,
    states?: string[],
    exchangable?: boolean,
    paymentOptions?: string[],
    categories?: string[]
  ): Promise<IPaginationResponse> {
    const query = this.repository
      .createQueryBuilder("announcements")
      .andWhere("announcements.status = :status", { status: true });

    if (search) {
      query.andWhere("announcements.announcement_name ILIKE :search", {
        search: `%${search}%`,
      });
    }

    if (states && states.length > 0) {
      query.andWhere("announcements.announcement_state IN (:...states)", {
        states,
      });
    }

    if (exchangable) {
      query.andWhere("announcements.is_exchangeable = :exchangable", {
        exchangable,
      });
    }

    if (paymentOptions && paymentOptions.length > 0) {
      query.leftJoin("announcements.paymentOptions", "paymentOptions");
      query.andWhere("paymentOptions.type IN (:...paymentOptions)", {
        paymentOptions,
      });
    }

    if (categories && categories.length > 0) {
      query.leftJoin("announcements.categories", "category");
      query.andWhere("category.name IN (:...categories)", { categories });
    }

    const [result, total] = await query
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .getManyAndCount();

    return PaginationResponse.handle({
      data: result,
      page,
      total,
      pageSize,
    });
  }

  async findById(id: string): Promise<Announcement | null> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ["user", "paymentOptions", "categories", "files"],
    });
    return user;
  }

  async create(data: Announcement): Promise<void> {
    await this.repository.save(data);
  }

  async update(
    data: Announcement,
    payload: IUpdateAnnouncementDTO
  ): Promise<void> {
    data.status = payload.status;
    data.announcementName = payload.announcementName;
    data.announcementState = payload.announcementState;
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
