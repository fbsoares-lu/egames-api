import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { ISocialNetworkTypeRepository } from "../../repositories/ISocialNetworkTypeRepository";

interface IRequest {
  id: string;
  name: string;
  description: string;
}

export class UpdateSocialNetworkTypeUseCase {
  constructor(private repository: ISocialNetworkTypeRepository) {}

  async execute({ id, name, description }: IRequest): Promise<void> {
    const socialNetworkType = await this.repository.findById(id);

    if (!socialNetworkType) {
      throw new NotFoundException("social network type not found!");
    }

    if (name && socialNetworkType.name != name) {
      const nameALreadyExists = await this.repository.findByName(name);
      if (nameALreadyExists) {
        throw new BadRequestException("name already exists!");
      }
    }

    await this.repository.update(socialNetworkType, {
      name,
      description,
    });
  }
}
