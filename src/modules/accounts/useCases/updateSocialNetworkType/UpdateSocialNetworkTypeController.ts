import { Request, Response } from "express";
import { UpdateSocialNetworkTypeUseCase } from "./UpdateSocialNetworkTypeUseCase";

export class UpdateSocialNetworkTypeController {
  constructor(
    private updateSocialNetworkTypeUseCase: UpdateSocialNetworkTypeUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description } = request.body;

    await this.updateSocialNetworkTypeUseCase.execute({
      id,
      name,
      description,
    });

    return response.status(204).send();
  }
}
