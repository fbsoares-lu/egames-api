import { File } from "../../entities/File";

interface IRequest {
  file: Express.Multer.File;
}

export interface IUploadFileUseCase {
  execute({ file }: IRequest): Promise<File>;
}
