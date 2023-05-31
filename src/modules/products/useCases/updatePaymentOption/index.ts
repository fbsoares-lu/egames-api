import { PaymentOptionsRepository } from "../../repositories/implements/PaymentOptionsRepository";
import { UpdatePaymentOptionController } from "./UpdatePaymentOptionController";
import { UpdatePaymentOptionUseCase } from "./UpdatePaymentOptionUseCase";

const paymentOptionsRepository = new PaymentOptionsRepository();
const updatePaymentOptionUseCase = new UpdatePaymentOptionUseCase(
  paymentOptionsRepository
);
const updatePaymentOptionController = new UpdatePaymentOptionController(
  updatePaymentOptionUseCase
);

export { updatePaymentOptionController };
