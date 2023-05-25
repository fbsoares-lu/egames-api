import { Request, Response } from "express";
import { IUploadFileUseCase } from "./IUploadFileUseCase";

export class UploadFileController {
  private uploadFileUseCase: IUploadFileUseCase;

  constructor(uploadFileUseCase: IUploadFileUseCase) {
    this.uploadFileUseCase = uploadFileUseCase;
  }

  public handle(request: Request, response: Response) {
    const { file }: any = request;
    const { name } = request.body;

    console.log({ file, name });

    return response.status(200).send();
  }
}
