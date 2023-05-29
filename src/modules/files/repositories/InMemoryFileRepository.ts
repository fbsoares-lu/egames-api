import { IUploadFileDTO } from "../dtos/IUploadFileDTO";
import { File } from "../entities/File";
import { IFileRepository } from "./IFileRepository";

export class InMemoryFileRepository implements IFileRepository {
  public repository: File[];

  constructor() {
    this.repository = [];
  }

  async create({ path, originalName, type }: IUploadFileDTO): Promise<File> {
    const file = new File(path, originalName, type);
    this.repository.push(file);
    return file;
  }

  async findById(id: string): Promise<File | null> {
    const file = this.repository.find((item) => item.id === id);
    return file ?? null;
  }
}
