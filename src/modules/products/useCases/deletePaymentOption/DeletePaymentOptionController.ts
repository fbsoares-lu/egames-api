import { Request, Response } from "express";
import { DeletePaymentOptionUseCase } from "./DeletePaymentOptionUseCase";

export class DeletePaymentOptionController {
  private deletePaymentOptionUseCase: DeletePaymentOptionUseCase;

  constructor(deletePaymentOptionUseCase: DeletePaymentOptionUseCase) {
    this.deletePaymentOptionUseCase = deletePaymentOptionUseCase;
  }

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    await this.deletePaymentOptionUseCase.execute(id);
    return response.status(200).send();
  }
}
