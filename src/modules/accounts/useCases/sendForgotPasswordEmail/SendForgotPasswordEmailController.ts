import { Request, Response } from "express";
import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordEmailUseCase";

export class SendForgotPasswordEmailController {
  constructor(
    private sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const { email } = request.body;

    await this.sendForgotPasswordEmailUseCase.execute(email);

    return response.status(200).send();
  }
}
