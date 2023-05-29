import { IProfileRepository } from "../../repositories/IProfileRepository";
import { Profile } from "../../entities/Profile";
import { IFileRepository } from "../../../files/repositories/IFileRepository";
import { NotFoundException } from "../../../../errors/NotFoundException";

interface IRequest {
  id: string;
  bio: string;
  fileId: string;
}

export class UpdateProfileUseCase {
  constructor(
    private profileRepository: IProfileRepository,
    private fileRepository: IFileRepository
  ) {}

  async execute({ id, bio, fileId }: IRequest): Promise<void> {
    const file = await this.fileRepository.findById(fileId);

    if (!file) {
      throw new NotFoundException("file not found!");
    }

    const profile = await this.profileRepository.findById(id);

    if (!profile) {
      throw new NotFoundException("profile not found!");
    }

    await this.profileRepository.update(profile, { bio, file });
  }
}
