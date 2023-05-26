import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { ISocialNetworkTypeRepository } from "../../repositories/ISocialNetworkTypeRepository";

interface IRequest {
  id: string;
}

export class DeleteSocialNetworkTypeUseCase {
  constructor(private repository: ISocialNetworkTypeRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const socialNetworkType = await this.repository.findById(id);

    if (!socialNetworkType) {
      throw new NotFoundException("social network type not found!");
    }

    await this.repository.delete(socialNetworkType);
  }
}
