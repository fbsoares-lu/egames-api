import { BadRequestException } from "../../../../errors/BadRequestException";
import { InMemoryRoleRepository } from "../../repositories/InMemoryRoleRepository";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

let imMemoryRoleRepository: InMemoryRoleRepository;
let createRoleUseCase: CreateRoleUseCase;

describe("Create Role", () => {
  beforeEach(() => {
    imMemoryRoleRepository = new InMemoryRoleRepository();
    createRoleUseCase = new CreateRoleUseCase(imMemoryRoleRepository);
  });

  it("should be able to create a new role", async () => {
    await createRoleUseCase.execute({
      name: "Admin",
      description: "People who deal with all system.",
    });

    expect(imMemoryRoleRepository.repository[0].name).toEqual("Admin");
  });

  it("should not be able to create a role with the same name", async () => {
    await createRoleUseCase.execute({
      name: "Admin",
      description: "People who deal with all system.",
    });

    expect(async () => {
      return await createRoleUseCase.execute({
        name: "Admin",
        description: "People who deal with all system.",
      });
    }).rejects.toThrow(BadRequestException);
  });
});
