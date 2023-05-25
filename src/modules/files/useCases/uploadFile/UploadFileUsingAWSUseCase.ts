import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { File } from "../../entities/File";
import { IFileRepository } from "../../repositories/IFileRepository";
import { IUploadFileUseCase } from "./IUploadFileUseCase";

interface IRequest {
  file: Express.Multer.File;
}

export class UploadFileUsingAWSUseCase implements IUploadFileUseCase {
  private fileRepository: IFileRepository;

  constructor(fileRepository: IFileRepository) {
    this.fileRepository = fileRepository;
  }

  async execute({ file }: IRequest): Promise<File> {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
      },
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ACL: "public-read",
    };

    await s3Client.send(new PutObjectCommand(params));
    const path = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

    const reponse = await this.fileRepository.create({
      path,
      originalName: file.originalname,
      type: file.mimetype,
    });

    return reponse;
  }
}
