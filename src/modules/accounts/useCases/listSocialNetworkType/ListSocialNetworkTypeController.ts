import { Request, Response } from "express";
import { ListSocialNetworkTypeUseCase } from "./ListSocialNetworkTypeUseCase";

export class ListSocialNetworkTypeController {
  constructor(
    private listSocialNetworkTypeUseCase: ListSocialNetworkTypeUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const networks = await this.listSocialNetworkTypeUseCase.execute();

    return response.status(200).json({
      data: networks,
    });
  }
}
