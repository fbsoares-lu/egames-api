import { AppError } from "./AppError";

export class BadRequestException extends AppError {
  constructor(message: string, error?: Object) {
    super(message, 400, error);
  }
}
