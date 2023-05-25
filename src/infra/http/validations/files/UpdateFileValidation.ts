import { body } from "express-validator";

export class UpdateFileValidation {
  static handle() {
    return [body("name").notEmpty().withMessage("Name is required")];
  }
}
