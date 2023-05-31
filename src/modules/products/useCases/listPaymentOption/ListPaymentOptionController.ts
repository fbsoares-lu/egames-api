import { Request, Response } from "express";
import { ListPaymentOptionUseCase } from "./ListPaymentOptionUseCase";

export class ListPaymentOptionController {
  private listPaymentOptionUseCase: ListPaymentOptionUseCase;

  constructor(listPaymentOptionUseCase: ListPaymentOptionUseCase) {
    this.listPaymentOptionUseCase = listPaymentOptionUseCase;
  }

  public async handle(request: Request, response: Response) {
    const paymentOptions = await this.listPaymentOptionUseCase.execute();
    return response.status(200).json(paymentOptions);
  }
}
