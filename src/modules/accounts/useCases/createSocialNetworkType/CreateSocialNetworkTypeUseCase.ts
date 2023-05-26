import { BadRequestException } from "../../../../errors/BadRequestException";
import { ISocialNetworkTypeRepository } from "../../repositories/ISocialNetworkTypeRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSocialNetworkTypeUseCase {
  constructor(private repository: ISocialNetworkTypeRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const nameAlreadyExists = await this.repository.findByName(name);

    if (nameAlreadyExists) {
      throw new BadRequestException("name already exists!");
    }

    await this.repository.create({
      name,
      description,
    });
  }
}
