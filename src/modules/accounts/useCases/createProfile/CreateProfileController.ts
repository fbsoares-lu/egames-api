import { Request, Response } from "express";
import { CreateProfileUseCase } from "./CreateProfileUseCase";

export class CreateProfileController {
  constructor(private createProfileUseCase: CreateProfileUseCase) {}

  public async handle(request: Request, response: Response) {
    const { bio, userId, fileId } = request.body;

    await this.createProfileUseCase.execute({
      bio,
      fileId,
      userId,
    });

    return response.status(201).send();
  }
}
