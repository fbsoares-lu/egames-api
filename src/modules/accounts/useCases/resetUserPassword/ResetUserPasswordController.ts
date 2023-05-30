import { Request, Response } from "express";
import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

export class ResetUserPasswordController {
  constructor(private resetUserPasswordUseCase: ResetUserPasswordUseCase) {}

  public async handle(request: Request, response: Response) {
    const { token } = request.query;
    const { newPassword } = request.body;

    await this.resetUserPasswordUseCase.execute({
      token: String(token),
      newPassword,
    });

    return response.status(201).send();
  }
}
