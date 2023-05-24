import { NotFoundException } from "../../../../errors/NotFoundException";
import { IPermissionRepository } from "../../repositories/IPermissionRepository";
import { IRoleRepository } from "../../repositories/IRoleRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  userId: string;
  roles: string[];
  permissions: string[];
}

export class CreateUserAccessControlListUseCase {
  private userRepository: IUserRepository;
  private roleRepository: IRoleRepository;
  private permissionRepository: IPermissionRepository;

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository,
    permissionRepository: IPermissionRepository
  ) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.permissionRepository = permissionRepository;
  }

  async execute({ userId, roles, permissions }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException("user does not exist!");
    }

    const rolesExists = await this.roleRepository.findByIds(roles);
    const permissionsExists = await this.permissionRepository.findByIds(
      permissions
    );

    await this.userRepository.save(user, rolesExists, permissionsExists);
  }
}
