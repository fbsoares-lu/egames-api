import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestException } from "../../../errors/BadRequestException";

export class ResponseValidationBase {
  static handle(request: Request, response: Response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new BadRequestException("validation error", errors.array());
    }
  }
}
