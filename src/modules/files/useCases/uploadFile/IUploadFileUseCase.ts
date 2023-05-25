import { IUploadFileDTO } from "../../dtos/IUploadFileDTO";
import { File } from "../../entities/File";

export interface IUploadFileUseCase {
  execute({ name, path }: IUploadFileDTO): Promise<File>;
}
