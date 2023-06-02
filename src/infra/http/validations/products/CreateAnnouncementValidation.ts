import { body } from "express-validator";

export class CreateAnnouncementValidation {
  static handle() {
    return [
      body("announcementName").notEmpty().withMessage("Name is required"),
      body("announcementDescription")
        .notEmpty()
        .withMessage("Description is required"),
      body("announcementState").notEmpty().withMessage("State is required"),
      body("announcementPrice").notEmpty().withMessage("Price is required"),
      body("isExchangeable").notEmpty().withMessage("Exchangeable is required"),
      body("paymentOptionIds")
        .notEmpty()
        .withMessage("Array of payments id is required"),
      body("categoryIds")
        .notEmpty()
        .withMessage("Array of categories id is required"),
      body("fileIds").notEmpty().withMessage("Array of files id is required"),
    ];
  }
}
