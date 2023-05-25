import { FileRepository } from "../../repositories/implementation/FileRepository";
import { CreateFileController } from "./UploadFileController";
import { CreateFileUseCase } from "./UploadFileUsingAWSUseCase";

const fileRepository = new FileRepository();
const createFileUseCase = new CreateFileUseCase(fileRepository);
const createFileController = new CreateFileController(createFileUseCase);

export { createFileController };
