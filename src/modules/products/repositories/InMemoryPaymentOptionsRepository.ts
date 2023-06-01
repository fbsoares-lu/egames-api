import { PaymentOption } from "../entities/PaymentOption";
import { IPaymentOptionsRepository } from "./IPaymentOptionsRepository";

export class InMemoryPaymentOptionsRepository
  implements IPaymentOptionsRepository
{
  public repository: PaymentOption[];

  constructor() {
    this.repository = [];
  }

  async findByIds(ids: string[]): Promise<PaymentOption[]> {
    const paymentOptionsFound: PaymentOption[] = [];

    for (var i = 0; i < ids.length; i++) {
      for (var j = 0; j < this.repository.length; j++) {
        if (this.repository[j].id === ids[i]) {
          paymentOptionsFound.push(this.repository[i]);
        }
      }
    }

    return paymentOptionsFound;
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
