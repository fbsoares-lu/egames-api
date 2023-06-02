import { body } from "express-validator";

export class CreateAnnouncementValidation {
  static handle() {
    return [
      body("status").notEmpty().withMessage("Status is required"),
      body("announcementName").notEmpty().withMessage("Name is required"),
      body("announcementDescription")
        .notEmpty()
        .withMessage("Description is required"),
      body("announcementState").notEmpty().withMessage("State is required"),
      body("announcementPrice").notEmpty().withMessage("Price is required"),
      body("isExchangeable").notEmpty().withMessage("Exchangeable is required"),
    ];
  }
}
