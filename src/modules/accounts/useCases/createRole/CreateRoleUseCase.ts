import { BadRequestException } from "../../../../errors/BadRequestException";
import { ICreateRoleDTO } from "../../dtos/ICreateRoleDTO";
import { IRoleRepository } from "../../repositories/IRoleRepository";

export class CreateRoleUseCase {
  private roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute({ name, description }: ICreateRoleDTO): Promise<void> {
    const nameAlreadyExists = await this.roleRepository.findByName(name);

    if (nameAlreadyExists) {
      throw new BadRequestException("name already exists!");
    }

    await this.roleRepository.create({ name, description });
  }
}
