import { NotFoundException } from "../../../../errors/NotFoundException";
import { InMemoryFileRepository } from "../../../files/repositories/InMemoryFileRepository";
import { InMemoryProfileRepository } from "../../repositories/InMemoryProfileRepository";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { CreateProfileUseCase } from "./CreateProfileUseCase";

let inMemoryProfileRepository: InMemoryProfileRepository;
let inMemoryFileRepository: InMemoryFileRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let createProfileUseCase: CreateProfileUseCase;

describe("Create profile", () => {
  beforeEach(() => {
    inMemoryProfileRepository = new InMemoryProfileRepository();
    inMemoryFileRepository = new InMemoryFileRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    createProfileUseCase = new CreateProfileUseCase(
      inMemoryProfileRepository,
      inMemoryFileRepository,
      inMemoryUserRepository
    );
  });

  it("should be able to create a new user profile", async () => {
    inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
    });

    const user = inMemoryUserRepository.repository[0];

    inMemoryFileRepository.create({
      originalName: "original-name.jpg",
      path: "../../path",
      type: "jpg",
    });

    const file = inMemoryFileRepository.repository[0];

    await createProfileUseCase.execute({
      bio: "description about user profile",
      fileId: String(file.id),
      userId: String(user.id),
    });

    expect(inMemoryProfileRepository.repository[0].bio).toBe(
      "description about user profile"
    );
  });

  it("should not be able to create a profile without the file id", async () => {
    inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
    });

    const user = inMemoryUserRepository.repository[0];

    expect(async () => {
      return await createProfileUseCase.execute({
        bio: "description about user profile",
        fileId: "invalid-file-uuid",
        userId: String(user.id),
      });
    }).rejects.toThrow(NotFoundException);
  });

  it("should not be able to create a profile without the user id", async () => {
    inMemoryFileRepository.create({
      originalName: "original-name.jpg",
      path: "../../path",
      type: "jpg",
    });

    const file = inMemoryFileRepository.repository[0];

    expect(async () => {
      return await createProfileUseCase.execute({
        bio: "description about user profile",
        fileId: String(file.id),
        userId: "invalid-user-uuid",
      });
    }).rejects.toThrow(NotFoundException);
  });
});
