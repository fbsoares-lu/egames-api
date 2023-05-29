import { body } from "express-validator";

export class CreateSocialNetworkValidation {
  static handle() {
    return [
      body("socialNetworkTypeId")
        .notEmpty()
        .withMessage("Type of social network is required"),
      body("socialNetworkUrl").notEmpty().withMessage("Url is required"),
    ];
  }
}
