import { Request, Response } from "express";
import { IUploadFileUseCase } from "./IUploadFileUseCase";

export class UploadFileController {
  private uploadFileUseCase: IUploadFileUseCase;

  constructor(uploadFileUseCase: IUploadFileUseCase) {
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
