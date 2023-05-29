import { IProfileRepository } from "../../repositories/IProfileRepository";
import { Profile } from "../../entities/Profile";
import { IFileRepository } from "../../../files/repositories/IFileRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { NotFoundException } from "../../../../errors/NotFoundException";

interface IRequest {
  bio: string;
  fileId: string;
  userId: string;
}

export class CreateProfileUseCase {
  private profileRepository: IProfileRepository;
  private fileRepository: IFileRepository;
  private userRepository: IUserRepository;

  constructor(
    profileRepository: IProfileRepository,
    fileRepository: IFileRepository,
    userRepository: IUserRepository
  ) {
    this.profileRepository = profileRepository;
    this.fileRepository = fileRepository;
    this.userRepository = userRepository;
  }

  async execute({ bio, fileId, userId }: IRequest): Promise<void> {
    const file = await this.fileRepository.findById(fileId);

    if (!file) {
      throw new NotFoundException("file not found!");
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException("user not found!");
    }

    const profile = new Profile(bio, file, user);
    await this.profileRepository.create(profile);
  }
}
