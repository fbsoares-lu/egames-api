import { Request, Response } from "express";
import { ShowAnnouncementUseCase } from "./ShowAnnouncementUseCase";

export class ShowAnnouncementController {
  constructor(private showAnnouncementUseCase: ShowAnnouncementUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    const announcement = await this.showAnnouncementUseCase.execute(id);
    return response.status(200).json(announcement);
  }
}
