import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { File } from "../../entities/File";
import { IFileRepository } from "../../repositories/IFileRepository";
import { IFileStoreProvider } from "../../../../providers/FileStoreProvider/IFileStoreProvider";

interface IRequest {
  file: Express.Multer.File;
}

export class UploadFileUseCase {
  private fileRepository: IFileRepository;
  private fileStoreProvider: IFileStoreProvider;

  constructor(
    fileRepository: IFileRepository,
    fileStoreProvider: IFileStoreProvider
  ) {
    this.fileRepository = fileRepository;
    this.fileStoreProvider = fileStoreProvider;
  }

  async execute({ file }: IRequest): Promise<File> {
    const path = await this.fileStoreProvider.execute({ file });

    const reponse = await this.fileRepository.create({
      path,
      originalName: file.originalname,
      type: file.mimetype,
    });

    return reponse;
  }
}
