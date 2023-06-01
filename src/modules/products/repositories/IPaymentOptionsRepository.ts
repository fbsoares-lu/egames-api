import { PaymentOption } from "../entities/PaymentOption";

export abstract class IPaymentOptionsRepository {
  abstract find(): Promise<PaymentOption[]>;
  abstract findById(id: string): Promise<PaymentOption | null>;
  abstract findByIds(ids: string[]): Promise<PaymentOption[]>;
  abstract findByType(type: string): Promise<PaymentOption | null>;
  abstract create(data: PaymentOption): Promise<void>;
  abstract update(paymentOption: PaymentOption, type: string): Promise<void>;
  abstract delete(paymentOption: PaymentOption): Promise<void>;
}
