import { BadRequestException } from "../../../../errors/BadRequestException";
import { ICreatePermissionDTO } from "../../dtos/ICreatePermissionDTO";
import { IPermissionRepository } from "../../repositories/IPermissionRepository";

export class CreatePermissionUseCase {
  private permissionRepository: IPermissionRepository;

  constructor(permissionRepository: IPermissionRepository) {
    this.permissionRepository = permissionRepository;
  }

  async execute({ name, description }: ICreatePermissionDTO): Promise<void> {
    const nameAlreadyExists = await this.permissionRepository.findByName(name);

    if (nameAlreadyExists) {
      throw new BadRequestException("name already exists!");
    }

    await this.permissionRepository.create({ name, description });
  }
}
