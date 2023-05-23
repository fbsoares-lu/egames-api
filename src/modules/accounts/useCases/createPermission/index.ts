import { PermissionRepository } from "../../repositories/implementation/PermissionRepository";
import { CreatePermissionController } from "./CreatePermissionController";
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

const permissionRepository = new PermissionRepository();
const createPermissionUseCase = new CreatePermissionUseCase(
  permissionRepository
);
const createPermissionController = new CreatePermissionController(
  createPermissionUseCase
);

export { createPermissionController };
