import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";

import { File } from "../../entities/File";
import { IFileRepository } from "../../repositories/IFileRepository";
import { IUploadFileUseCase } from "./IUploadFileUseCase";

interface IRequest {
  name: string;
  path: string;
}

export class UploadFileUsingAWSUseCase implements IUploadFileUseCase {
  private fileRepository: IFileRepository;

  constructor(fileRepository: IFileRepository) {
    this.fileRepository = fileRepository;
  }

  async execute({ name, path }: IRequest): Promise<File> {
    const s3Client = new S3Client({ region: process.env.AWS_REGION });

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: process.env.AWS_KEY,
    };

    const data = await s3Client.send(
      new CreateBucketCommand({ Bucket: params.Bucket })
    );

    console.log(data);

    const file = await this.fileRepository.create({
      name,
      path,
    });

    return file;
  }
}
