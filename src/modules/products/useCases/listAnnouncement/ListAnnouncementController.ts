import { Request, Response } from "express";
import { ListAnnouncementUseCase } from "./ListAnnouncementUseCase";

export class ListAnnouncementController {
  constructor(private listAnnouncementUseCase: ListAnnouncementUseCase) {}

  public async handle(request: Request, response: Response) {
    const {
      page,
      pageSize,
      search,
      states,
      exchangable,
      paymentOptions,
      categories,
    } = request.query;

    await this.listAnnouncementUseCase.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      search: String(search),
      states: states as string[],
      exchangable: Boolean(exchangable),
      categories: categories as string[],
      paymentOptions: paymentOptions as string[],
    });

    return response.status(200).send();
  }
}
