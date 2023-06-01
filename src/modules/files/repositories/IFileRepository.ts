import { IUploadFileDTO } from "../dtos/IUploadFileDTO";
import { File } from "../entities/File";

export abstract class IFileRepository {
  abstract findById(id: string): Promise<File | null>;
  abstract findByIds(ids: string[]): Promise<File[]>;
  abstract create(payload: IUploadFileDTO): Promise<File>;
}
