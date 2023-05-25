import { Repository } from "typeorm";

import { AppDataSource } from "../../../../infra/database";
import { IUploadFileDTO } from "../../dtos/IUploadFileDTO";
import { IFileRepository } from "../IFileRepository";
import { File } from "../../entities/File";

export class FileRepository implements IFileRepository {
  private repository: Repository<File>;

  constructor() {
    this.repository = AppDataSource.getRepository(File);
  }

  async create(payload: IUploadFileDTO): Promise<File> {
    const file = this.repository.create(payload);

    await this.repository.save(file);
    return file;
  }
}
