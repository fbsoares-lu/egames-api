import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { PaymentOption } from "../../entities/PaymentOption";
import { IPaymentOptionsRepository } from "../../repositories/IPaymentOptionsRepository";

interface IRequest {
  id: string;
  type: string;
}

export class UpdatePaymentOptionUseCase {
  constructor(private paymentOptionRepository: IPaymentOptionsRepository) {}

  async execute({ id, type }: IRequest): Promise<void> {
    const paymentOption = await this.paymentOptionRepository.findById(id);

    if (!paymentOption) {
      throw new NotFoundException("paymento option not found!");
    }

    const paymentTypeAlreadyExists =
      await this.paymentOptionRepository.findByType(type);

    if (paymentTypeAlreadyExists && paymentTypeAlreadyExists.id !== id) {
      throw new BadRequestException("payment type already exists!");
    }

    await this.paymentOptionRepository.update(paymentOption, type);
  }
}
