import { IUploadFileDTO } from "../dtos/IUploadFileDTO";
import { File } from "../entities/File";
import { IFileRepository } from "./IFileRepository";

export class InMemoryFileRepository implements IFileRepository {
  public repository: File[];

  constructor() {
    this.repository = [];
  }

  async findByIds(ids: string[]): Promise<File[]> {
    const filesFound: File[] = [];

    for (var i = 0; i < ids.length; i++) {
      for (var j = 0; j < this.repository.length; j++) {
        if (this.repository[j].id === ids[i]) {
          filesFound.push(this.repository[i]);
        }
      }
    }

    return filesFound;
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
