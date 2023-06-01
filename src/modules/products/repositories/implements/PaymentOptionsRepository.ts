import { In, Repository } from "typeorm";
import { IPaymentOptionsRepository } from "../IPaymentOptionsRepository";
import { PaymentOption } from "../../entities/PaymentOption";
import { AppDataSource } from "../../../../infra/database";

export class PaymentOptionsRepository implements IPaymentOptionsRepository {
  private repository: Repository<PaymentOption>;

  constructor() {
    this.repository = AppDataSource.getRepository(PaymentOption);
  }

  async findByIds(ids: string[]): Promise<PaymentOption[]> {
    const paymentOptions = await this.repository.findBy({ id: In(ids) });
    return paymentOptions;
  }

  async findByType(type: string): Promise<PaymentOption | null> {
    return await this.repository.findOneBy({ type });
  }

  async find(): Promise<PaymentOption[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<PaymentOption | null> {
    return await this.repository.findOneBy({ id });
  }

  async create(data: PaymentOption): Promise<void> {
    await this.repository.save(data);
  }

  async update(paymentOption: PaymentOption, type: string): Promise<void> {
    paymentOption.type = type;
    await this.repository.save(paymentOption);
  }

  async delete(paymentOption: PaymentOption): Promise<void> {
    paymentOption.deletedAt = new Date();
    await this.repository.save(paymentOption);
  }
}
