import { IPaginationResponse } from "../../../helpers/PaginationResponse";
import { IUpdateAnnouncementDTO } from "../dtos/IUpdateAnnouncementDTO";
import { Announcement } from "../entities/Announcement";

export abstract class IAnnouncementRepository {
  abstract find(
    page: number,
    pageSize: number,
    search?: string,
    state?: string,
    exchangable?: boolean,
    paymentOptions?: string[],
    categories?: string[]
  ): Promise<IPaginationResponse>;
  abstract findById(id: string): Promise<Announcement | null>;
  abstract create(data: Announcement): Promise<void>;
  abstract update(
    data: Announcement,
    payload: IUpdateAnnouncementDTO
  ): Promise<void>;
  abstract delete(data: Announcement): Promise<void>;
}
