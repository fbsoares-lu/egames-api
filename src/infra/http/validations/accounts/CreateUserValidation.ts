import { body, validationResult } from "express-validator";

export class CreateUserValidation {
  static handle() {
    return [
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().notEmpty().withMessage("E-mail is required"),
      body("password").notEmpty().withMessage("Password is required"),
    ];
  }
}
