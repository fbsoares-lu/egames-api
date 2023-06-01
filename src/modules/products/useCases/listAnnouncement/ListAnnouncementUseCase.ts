import { IPaginationResponse } from "../../../../helpers/PaginationResponse";
import { Announcement } from "../../entities/Announcement";
import { IAnnouncementRepository } from "../../repositories/IAnnouncementRepository";

interface IRequest {
  page: number;
  pageSize: number;
  search?: string;
  states?: string[];
  exchangable?: boolean;
  paymentOptions?: string[];
  categories?: string[];
}

export class ListAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  public async execute({
    page,
    pageSize,
    search,
    states,
    categories,
    exchangable,
    paymentOptions,
  }: IRequest): Promise<IPaginationResponse> {
    if (!page) page = 1;
    if (!pageSize) pageSize = 10;

    const paginationResponse = await this.announcementRepository.find(
      page,
      pageSize,
      search,
      states,
      exchangable,
      paymentOptions,
      categories
    );

    return paginationResponse;
  }
}
