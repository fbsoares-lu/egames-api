import { Request, Response } from "express";
import { DeleteSocialNetworkUseCase } from "./DeleteSocialNetworkUseCase";

export class DeleteSocialNetworkController {
  constructor(private deleteSocialNetworkUseCase: DeleteSocialNetworkUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    await this.deleteSocialNetworkUseCase.execute({
      id,
    });

    return response.status(201).send();
  }
}
