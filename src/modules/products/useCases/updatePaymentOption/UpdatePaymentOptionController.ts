import { Request, Response } from "express";
import { UpdatePaymentOptionUseCase } from "./UpdatePaymentOptionUseCase";

export class UpdatePaymentOptionController {
  private updatePaymentOptionUseCase: UpdatePaymentOptionUseCase;

  constructor(updatePaymentOptionUseCase: UpdatePaymentOptionUseCase) {
    this.updatePaymentOptionUseCase = updatePaymentOptionUseCase;
  }

  public async handle(request: Request, response: Response) {
    const { type } = request.body;
    const { id } = request.params;

    await this.updatePaymentOptionUseCase.execute({ id, type });

    return response.status(204).send();
  }
}
