import { PaymentOptionsRepository } from "../../repositories/implements/PaymentOptionsRepository";
import { DeletePaymentOptionController } from "./DeletePaymentOptionController";
import { DeletePaymentOptionUseCase } from "./DeletePaymentOptionUseCase";

const paymentOptionsRepository = new PaymentOptionsRepository();
const deletePaymentOptionUseCase = new DeletePaymentOptionUseCase(
  paymentOptionsRepository
);
const deletePaymentOptionController = new DeletePaymentOptionController(
  deletePaymentOptionUseCase
);

export { deletePaymentOptionController };
