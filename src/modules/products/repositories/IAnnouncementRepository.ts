import { IPaginationResponse } from "../../../helpers/PaginationResponse";
import { Announcement } from "../entities/Announcement";

export abstract class IAnnouncementRepository {
  abstract find(page: number, pageSize: number): Promise<IPaginationResponse>;
  abstract findById(id: string): Promise<Announcement | null>;
  abstract create(data: Announcement): Promise<void>;
  abstract update(data: Announcement, payload: Announcement): Promise<void>;
  abstract delete(data: Announcement): Promise<void>;
}
