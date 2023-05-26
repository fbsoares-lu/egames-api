import { Request, Response } from "express";
import { CreateSocialNetworkTypeUseCase } from "./CreateSocialNetworkTypeUseCase";

export class CreateSocialNetworkTypeController {
  constructor(
    private createSocialNetworkTypeUseCase: CreateSocialNetworkTypeUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    await this.createSocialNetworkTypeUseCase.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}
