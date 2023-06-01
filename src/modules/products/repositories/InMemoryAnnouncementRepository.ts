import {
  IPaginationResponse,
  PaginationResponse,
} from "../../../helpers/PaginationResponse";
import { IUpdateAnnouncementDTO } from "../dtos/IUpdateAnnouncementDTO";
import { Announcement } from "../entities/Announcement";
import { IAnnouncementRepository } from "./IAnnouncementRepository";

export class InMemoryAnnouncementRepository implements IAnnouncementRepository {
  public repository: Announcement[];

  constructor() {
    this.repository = [];
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
    const announcements = this.repository;

    const paginationResponse = PaginationResponse.handle({
      data: announcements,
      page,
      pageSize,
      total: announcements.length,
    });
    return paginationResponse;
  }

  async findById(id: string): Promise<Announcement | null> {
    const announcement = this.repository.find((item) => item.id === id);
    return announcement ?? null;
  }

  async create(data: Announcement): Promise<void> {
    this.repository.push(data);
  }

  async update(
    data: Announcement,
    payload: IUpdateAnnouncementDTO
  ): Promise<void> {
    const announcementIndex = this.repository.findIndex(
      (item) => item.id === data.id
    );

    this.repository[announcementIndex].status = payload.status;
    this.repository[announcementIndex].announcementName =
      payload.announcementName;
    this.repository[announcementIndex].announcementDescription =
      payload.announcementDescription;
    this.repository[announcementIndex].announcementPrice =
      payload.announcementPrice;
    this.repository[announcementIndex].isExchangeable = payload.isExchangeable;
    this.repository[announcementIndex].announcementState =
      payload.announcementState;
  }

  async delete(data: Announcement): Promise<void> {
    const announcementIndex = this.repository.findIndex(
      (item) => item.id === data.id
    );

    this.repository[announcementIndex].deletedAt = new Date();
  }
}
