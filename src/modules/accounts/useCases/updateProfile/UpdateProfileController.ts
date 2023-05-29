import { Request, Response } from "express";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";

export class UpdateProfileController {
  constructor(private updateProfileUseCase: UpdateProfileUseCase) {}

  public async handle(request: Request, response: Response) {
    const { bio, fileId } = request.body;
    const { id } = request.params;

    await this.updateProfileUseCase.execute({
      id,
      bio,
      fileId,
    });

    return response.status(201).send();
  }
}
