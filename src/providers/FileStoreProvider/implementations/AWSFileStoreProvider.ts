import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { IFileStoreProvider } from "../IFileStoreProvider";

interface IRequest {
  file: Express.Multer.File;
}

export class AWSFileStoreProvider implements IFileStoreProvider {
  async execute({ file }: IRequest): Promise<string> {
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
    return path;
  }
}
