import { body } from "express-validator";

export class CreatePaymentValidation {
  static handle() {
    return [body("type").notEmpty().withMessage("Type is required")];
  }
}
