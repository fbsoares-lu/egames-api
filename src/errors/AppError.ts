export class AppError extends Error {
  public readonly statusCode: number;
  public readonly error?: Object;

  constructor(message: string, statusCode = 500, error?: Object) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}
