import { Request, Response } from "express";
import { ListAnnouncementUseCase } from "./ListAnnouncementUseCase";

export class ListAnnouncementController {
  constructor(private listAnnouncementUseCase: ListAnnouncementUseCase) {}

  public async handle(request: Request, response: Response) {
    const { page }: { page?: number } = request.query;
    const { pageSize }: { pageSize?: number } = request.query;
    const { search }: { search?: string } = request.query;
    const { states }: { states?: string[] } = request.query;
    const { exchangable }: { exchangable?: boolean } = request.query;
    const { paymentOptions }: { paymentOptions?: string[] } = request.query;
    const { categories }: { categories?: string[] } = request.query;

    const announcements = await this.listAnnouncementUseCase.execute({
      page,
      pageSize,
      search,
      states,
      exchangable,
      categories,
      paymentOptions,
    });

    return response.status(200).json(announcements);
  }
}
