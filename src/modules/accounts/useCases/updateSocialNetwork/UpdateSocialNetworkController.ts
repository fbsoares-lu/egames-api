import { Request, Response } from "express";
import { UpdateSocialNetworkUseCase } from "./UpdateSocialNetworkUseCase";

export class UpdateSocialNetworkController {
  constructor(private updateSocialNetworkUseCase: UpdateSocialNetworkUseCase) {}

  public async handle(request: Request, response: Response) {
    const { userId } = request;
    const { id } = request.params;
    const { socialNetworkTypeId, socialNetworkUrl } = request.body;

    await this.updateSocialNetworkUseCase.execute({
      id,
      userId,
      socialNetworkTypeId,
      socialNetworkUrl,
    });

    return response.status(201).send();
  }
}
