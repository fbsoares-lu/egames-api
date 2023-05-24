import { BadRequestException } from "../../../../errors/BadRequestException";
import { InMemoryPermissionRepository } from "../../repositories/InMemoryPermissionRepository";
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

let imMemoryPermissionRepository: InMemoryPermissionRepository;
let createPermissionUseCase: CreatePermissionUseCase;

describe("Create Permission", () => {
  beforeEach(() => {
    imMemoryPermissionRepository = new InMemoryPermissionRepository();
    createPermissionUseCase = new CreatePermissionUseCase(
      imMemoryPermissionRepository
    );
  });

  it("should be able to create a new permission", async () => {
    await createPermissionUseCase.execute({
      name: "Create",
      description: "Create a permission",
    });

    expect(imMemoryPermissionRepository.repository[0].name).toEqual("Create");
  });

  it("should not be able to create a permission with the same name", async () => {
    await createPermissionUseCase.execute({
      name: "Create",
      description: "Create a permission",
    });

    expect(async () => {
      return await createPermissionUseCase.execute({
        name: "Create",
        description: "Create a permission",
      });
    }).rejects.toThrow(BadRequestException);
  });
});
