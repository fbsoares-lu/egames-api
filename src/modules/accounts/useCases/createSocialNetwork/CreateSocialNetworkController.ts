import { Request, Response } from "express";
import { CreateSocialNetworkUseCase } from "./CreateSocialNetworkUseCase";

export class CreateSocialNetworkController {
  constructor(private createSocialNetworkUseCase: CreateSocialNetworkUseCase) {}

  public async handle(request: Request, response: Response) {
    const { socialNetworkTypeId, socialNetworkUrl } = request.body;
    const { userId } = request;

    await this.createSocialNetworkUseCase.execute({
      userId,
      socialNetworkTypeId,
      socialNetworkUrl,
    });

    return response.status(201).send();
  }
}
