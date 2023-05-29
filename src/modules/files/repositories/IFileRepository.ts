import { IUploadFileDTO } from "../dtos/IUploadFileDTO";
import { File } from "../entities/File";

export abstract class IFileRepository {
  abstract create(payload: IUploadFileDTO): Promise<File>;
  abstract findById(id: string): Promise<File | null>;
}
