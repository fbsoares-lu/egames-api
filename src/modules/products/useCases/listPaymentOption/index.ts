import { PaymentOptionsRepository } from "../../repositories/implements/PaymentOptionsRepository";
import { ListPaymentOptionController } from "./ListPaymentOptionController";
import { ListPaymentOptionUseCase } from "./ListPaymentOptionUseCase";

const paymentOptionsRepository = new PaymentOptionsRepository();
const listPaymentOptionUseCase = new ListPaymentOptionUseCase(
  paymentOptionsRepository
);
const listPaymentOptionController = new ListPaymentOptionController(
  listPaymentOptionUseCase
);

export { listPaymentOptionController };
