import { IUploadFileDTO } from "../../dtos/IUploadFileDTO";
import { File } from "../../entities/File";

interface IRequest {
  name: string;
  file: any;
}

export interface IUploadFileUseCase {
  execute({ name, file }: IRequest): Promise<File>;
}
