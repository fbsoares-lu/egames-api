import { FileRepository } from "../../repositories/implementation/FileRepository";
import { UploadFileController } from "./UploadFileController";
import { UploadFileUsingAWSUseCase } from "./UploadFileUsingAWSUseCase";

const fileRepository = new FileRepository();
const uploadFileUseCase = new UploadFileUsingAWSUseCase(fileRepository);
const uploadFileController = new UploadFileController(uploadFileUseCase);

export { uploadFileController };
