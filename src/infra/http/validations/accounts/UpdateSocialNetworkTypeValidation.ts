import { body } from "express-validator";

export class UpdateSocialNetworkTypeValidation {
  static handle() {
    return [
      body("name").notEmpty().withMessage("Name is required"),
      body("description").notEmpty().withMessage("Description is required"),
    ];
  }
}
