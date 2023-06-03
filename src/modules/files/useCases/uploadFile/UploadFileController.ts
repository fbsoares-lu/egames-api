import { Request, Response } from "express";
import { UploadFileUseCase } from "./UploadFileUseCase";

export class UploadFileController {
  private uploadFileUseCase: UploadFileUseCase;

  constructor(uploadFileUseCase: UploadFileUseCase) {
    this.uploadFileUseCase = uploadFileUseCase;
  }

  public async handle(request: Request, response: Response) {
    const file = request.file;
    const fileFormatted = file as Express.Multer.File;

    const payload = await this.uploadFileUseCase.execute({
      file: fileFormatted,
    });

    return response.status(200).json(payload);
  }
}
