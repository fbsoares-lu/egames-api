import { Request, Response } from "express";
import { UpdateAnnouncementUseCase } from "./UpdateAnnouncementUseCase";

export class UpdateAnnouncementController {
  constructor(private updateAnnouncementUseCase: UpdateAnnouncementUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const {
      status,
      announcementDescription,
      announcementName,
      announcementPrice,
      isExchangeable,
      paymentOptionIds,
      categoryIds,
      fileIds,
    } = request.body;

    await this.updateAnnouncementUseCase.execute({
      id,
      status,
      announcementDescription,
      announcementName,
      announcementPrice,
      isExchangeable,
      paymentOptionIds,
      categoryIds,
      fileIds,
    });
    return response.status(204).send();
  }
}
