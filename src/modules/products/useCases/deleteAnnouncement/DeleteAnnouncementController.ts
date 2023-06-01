import { Request, Response } from "express";
import { DeleteAnnouncementUseCase } from "./DeleteAnnouncementUseCase";

export class DeleteAnnouncementController {
  constructor(private deleteAnnouncementUseCase: DeleteAnnouncementUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    await this.deleteAnnouncementUseCase.execute(id);
    return response.status(200).send();
  }
}
