import { Request, Response } from "express";
import { CreateAnnouncementUseCase } from "./CreateAnnouncementUseCase";

export class CreateAnnouncementController {
  constructor(private createAnnouncementUseCase: CreateAnnouncementUseCase) {}

  public async handle(request: Request, response: Response) {
    const { userId } = request;
    const {
      announcementDescription,
      announcementName,
      announcementState,
      announcementPrice,
      isExchangeable,
      paymentOptionIds,
      categoryIds,
      fileIds,
    } = request.body;

    await this.createAnnouncementUseCase.execute({
      userId,
      announcementDescription,
      announcementState,
      announcementName,
      announcementPrice,
      isExchangeable,
      paymentOptionIds,
      categoryIds,
      fileIds,
    });
    return response.status(201).send();
  }
}
