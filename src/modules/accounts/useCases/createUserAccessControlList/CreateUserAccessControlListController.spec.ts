import { InMemoryPermissionRepository } from "../../repositories/InMemoryPermissionRepository";
import { InMemoryRoleRepository } from "../../repositories/InMemoryRoleRepository";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { CreateUserAccessControlListUseCase } from "./CreateUserAccessControlListUseCase";

let userRepository: InMemoryUserRepository;
let roleRepository: InMemoryRoleRepository;
let permissionRepository: InMemoryPermissionRepository;
let createUserAccessControlListUseCase: CreateUserAccessControlListUseCase;

describe("Create access control list to user", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    roleRepository = new InMemoryRoleRepository();
    permissionRepository = new InMemoryPermissionRepository();
    createUserAccessControlListUseCase = new CreateUserAccessControlListUseCase(
      userRepository,
      roleRepository,
      permissionRepository
    );
  });

  it("should be able to add permissions and roles to user", async () => {
    await userRepository.create({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "123456",
    });

    await permissionRepository.create({
      name: "create",
      description: "Create a permission",
    });

    await roleRepository.create({
      name: "admin",
      description: "An Admin description...",
    });

    await roleRepository.create({
      name: "employee",
      description: "An Employee description...",
    });

    await createUserAccessControlListUseCase.execute({
      userId: String(userRepository.repository[0].id),
      permissions: ["create"],
      roles: ["admin"],
    });

    expect(userRepository.repository[0].permissions[0].name).toEqual("create");
  });
});
