import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { PaymentOption } from "../../entities/PaymentOption";
import { IPaymentOptionsRepository } from "../../repositories/IPaymentOptionsRepository";

export class DeletePaymentOptionUseCase {
  constructor(private paymentOptionRepository: IPaymentOptionsRepository) {}

  async execute(id: string): Promise<void> {
    const paymentOption = await this.paymentOptionRepository.findById(id);

    if (!paymentOption) {
      throw new NotFoundException("paymento option not found!");
    }

    await this.paymentOptionRepository.delete(paymentOption);
  }
}
