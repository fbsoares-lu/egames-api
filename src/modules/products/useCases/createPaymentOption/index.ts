import { PaymentOptionsRepository } from "../../repositories/implements/PaymentOptionsRepository";
import { CreatePaymentOptionController } from "./CreatePaymentOptionController";
import { CreatePaymentOptionUseCase } from "./CreatePaymentOptionUseCase";

const paymentOptionsRepository = new PaymentOptionsRepository();
const createPaymentOptionUseCase = new CreatePaymentOptionUseCase(
  paymentOptionsRepository
);
const createPaymentOptionController = new CreatePaymentOptionController(
  createPaymentOptionUseCase
);

export { createPaymentOptionController };
