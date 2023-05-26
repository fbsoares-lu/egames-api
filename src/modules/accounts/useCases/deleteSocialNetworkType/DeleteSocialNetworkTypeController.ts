import { Request, Response } from "express";
import { DeleteSocialNetworkTypeUseCase } from "./DeleteSocialNetworkTypeUseCase";

export class DeleteSocialNetworkTypeController {
  constructor(
    private deleteSocialNetworkTypeUseCase: DeleteSocialNetworkTypeUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    await this.deleteSocialNetworkTypeUseCase.execute({
      id,
    });

    return response.status(204).send();
  }
}
