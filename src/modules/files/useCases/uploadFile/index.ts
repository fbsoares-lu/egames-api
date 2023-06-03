import { AWSFileStoreProvider } from "../../../../providers/FileStoreProvider/implementations/AWSFileStoreProvider";
import { FileRepository } from "../../repositories/implementation/FileRepository";
import { UploadFileController } from "./UploadFileController";
import { UploadFileUseCase } from "./UploadFileUseCase";

const fileRepository = new FileRepository();
const fileStoreProvider = new AWSFileStoreProvider();
const uploadFileUseCase = new UploadFileUseCase(
  fileRepository,
  fileStoreProvider
);
const uploadFileController = new UploadFileController(uploadFileUseCase);

export { uploadFileController };
