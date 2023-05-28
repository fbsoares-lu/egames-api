import { NotFoundException } from "../../../../errors/NotFoundException";
import { ISocialNetworkRepository } from "../../repositories/ISocialNetworkRepository";

interface IRequest {
  id: string;
}

export class DeleteSocialNetworkUseCase {
  constructor(private socialNetworkRepository: ISocialNetworkRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const socialNetwork = await this.socialNetworkRepository.findById(id);

    if (!socialNetwork) {
      throw new NotFoundException("social network not found!");
    }

    await this.socialNetworkRepository.delete(socialNetwork);
  }
}
