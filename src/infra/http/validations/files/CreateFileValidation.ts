import { body } from "express-validator";

export class CreateFileValidation {
  static handle() {
    return [body("name").notEmpty().withMessage("Name is required")];
  }
}
