import { PaymentOption } from "../entities/PaymentOption";
import { IPaymentOptionsRepository } from "./IPaymentOptionsRepository";

export class InMemoryPaymentOptionsRepository
  implements IPaymentOptionsRepository
{
  public repository: PaymentOption[];

  constructor() {
    this.repository = [];
  }

  async findByType(type: string): Promise<PaymentOption | null> {
    const paymentOption = this.repository.find((item) => item.type === type);
    return paymentOption ?? null;
  }

  async find(): Promise<PaymentOption[]> {
    return this.repository;
  }

  async findById(id: string): Promise<PaymentOption | null> {
    const paymentOption = this.repository.find((item) => item.id === id);
    return paymentOption ?? null;
  }

  async create(data: PaymentOption): Promise<void> {
    this.repository.push(data);
  }

  async update(paymentOption: PaymentOption, type: string): Promise<void> {
    const paymentOptionIndex = this.repository.findIndex(
      (item) => item.id === paymentOption.id
    );

    this.repository[paymentOptionIndex].type = type;
  }

  async delete(paymentOption: PaymentOption): Promise<void> {
    const paymentOptionIndex = this.repository.findIndex(
      (item) => item.id === paymentOption.id
    );

    this.repository[paymentOptionIndex].deletedAt = new Date();
  }
}
