import { Request, Response } from "express";
import { CreatePaymentOptionUseCase } from "./CreatePaymentOptionUseCase";

export class CreatePaymentOptionController {
  private createPaymentOptionUseCase: CreatePaymentOptionUseCase;

  constructor(createPaymentOptionUseCase: CreatePaymentOptionUseCase) {
    this.createPaymentOptionUseCase = createPaymentOptionUseCase;
  }

  public async handle(request: Request, response: Response) {
    const { type } = request.body;

    await this.createPaymentOptionUseCase.execute(type);

    return response.status(201).send();
  }
}
