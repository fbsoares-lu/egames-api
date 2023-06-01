import {
  IPaginationResponse,
  PaginationResponse,
} from "../../../helpers/PaginationResponse";
import { Announcement } from "../entities/Announcement";
import { IAnnouncementRepository } from "./IAnnouncementRepository";

export class InMemoryAnnouncementRepository implements IAnnouncementRepository {
  public repository: Announcement[];

  constructor() {
    this.repository = [];
  }

  async find(page: number, pageSize: number): Promise<IPaginationResponse> {
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

  async update(data: Announcement, payload: Announcement): Promise<void> {
    const announcementIndex = this.repository.findIndex(
      (item) => item.id === data.id
    );

    this.repository[announcementIndex] = payload;
  }

  async delete(data: Announcement): Promise<void> {
    const announcementIndex = this.repository.findIndex(
      (item) => item.id === data.id
    );

    this.repository[announcementIndex].deletedAt = new Date();
  }
}
