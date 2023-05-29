import { body } from "express-validator";

export class UpdateProfileValidation {
  static handle() {
    return [
      body("bio").notEmpty().withMessage("Bio is required"),
      body("fileId").notEmpty().withMessage("File id is required"),
    ];
  }
}
