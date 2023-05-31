import { BadRequestException } from "../../../../errors/BadRequestException";
import { PaymentOption } from "../../entities/PaymentOption";
import { IPaymentOptionsRepository } from "../../repositories/IPaymentOptionsRepository";

export class CreatePaymentOptionUseCase {
  constructor(private paymentOptionRepository: IPaymentOptionsRepository) {}

  async execute(type: string): Promise<void> {
    const paymentTypeAlreadyExists =
      await this.paymentOptionRepository.findByType(type);

    if (paymentTypeAlreadyExists) {
      throw new BadRequestException("payment type already exists!");
    }

    const paymentOption = new PaymentOption(type);
    await this.paymentOptionRepository.create(paymentOption);
  }
}
