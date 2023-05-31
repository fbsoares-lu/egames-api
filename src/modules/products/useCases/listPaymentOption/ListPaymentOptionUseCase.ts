import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { PaymentOption } from "../../entities/PaymentOption";
import { IPaymentOptionsRepository } from "../../repositories/IPaymentOptionsRepository";

export class ListPaymentOptionUseCase {
  constructor(private paymentOptionRepository: IPaymentOptionsRepository) {}

  async execute(): Promise<PaymentOption[]> {
    const paymentOptions = await this.paymentOptionRepository.find();
    return paymentOptions;
  }
}
