import { PermissionRepository } from "../../repositories/implementation/PermissionRepository";
import { RoleRepository } from "../../repositories/implementation/RoleRepository";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import { CreateUserAccessControlListController } from "./CreateUserAccessControlListController";
import { CreateUserAccessControlListUseCase } from "./CreateUserAccessControlListUseCase";

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const permissionRepository = new PermissionRepository();

const createUserAccessControlListUseCase =
  new CreateUserAccessControlListUseCase(
    userRepository,
    roleRepository,
    permissionRepository
  );

const createUserAccessControlListController =
  new CreateUserAccessControlListController(createUserAccessControlListUseCase);

export { createUserAccessControlListController };
