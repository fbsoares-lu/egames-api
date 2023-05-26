import { body } from "express-validator";

export class CreateSocialNetworkTypeValidation {
  static handle() {
    return [
      body("name").notEmpty().withMessage("Name is required"),
      body("description").notEmpty().withMessage("Description is required"),
    ];
  }
}
