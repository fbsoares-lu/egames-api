import { body } from "express-validator";

export class CreateProfileValidation {
  static handle() {
    return [
      body("bio").notEmpty().withMessage("Bio is required"),
      body("fileId").notEmpty().withMessage("File id is required"),
    ];
  }
}
