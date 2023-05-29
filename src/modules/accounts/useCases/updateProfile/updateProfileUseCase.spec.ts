import { NotFoundException } from "../../../../errors/NotFoundException";
import { InMemoryFileRepository } from "../../../files/repositories/InMemoryFileRepository";
import { Profile } from "../../entities/Profile";
import { User } from "../../entities/User";
import { InMemoryProfileRepository } from "../../repositories/InMemoryProfileRepository";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";

let inMemoryProfileRepository: InMemoryProfileRepository;
let inMemoryFileRepository: InMemoryFileRepository;

let updateProfileUseCase: UpdateProfileUseCase;

describe("Update profile", () => {
  beforeEach(() => {
    inMemoryProfileRepository = new InMemoryProfileRepository();
    inMemoryFileRepository = new InMemoryFileRepository();

    updateProfileUseCase = new UpdateProfileUseCase(
      inMemoryProfileRepository,
      inMemoryFileRepository
    );
  });

  it("should be able to update profile", async () => {
    inMemoryFileRepository.create({
      originalName: "original-name.jpg",
      path: "../../path",
      type: "jpg",
    });

    const file = inMemoryFileRepository.repository[0];
    const user = new User("John Doe", "john.doe@email.com", "123456");
    const profile = new Profile("description about user profile", file, user);

    inMemoryProfileRepository.create(profile);

    await updateProfileUseCase.execute({
      id: String(inMemoryProfileRepository.repository[0].id),
      bio: "update description",
      fileId: String(file.id),
    });

    expect(inMemoryProfileRepository.repository[0].bio).toBe(
      "update description"
    );
  });

  it("should not be able to update a profile without the file id", async () => {
    inMemoryFileRepository.create({
      originalName: "original-name.jpg",
      path: "../../path",
      type: "jpg",
    });

    const file = inMemoryFileRepository.repository[0];
    const user = new User("John Doe", "john.doe@email.com", "123456");
    const profile = new Profile("description about user profile", file, user);

    inMemoryProfileRepository.create(profile);

    expect(async () => {
      return await updateProfileUseCase.execute({
        id: String(inMemoryProfileRepository.repository[0].id),
        bio: "description about user profile",
        fileId: "invalid-file-uuid",
      });
    }).rejects.toThrow(NotFoundException);
  });

  it("should not be able to update a profile without the profile id", async () => {
    inMemoryFileRepository.create({
      originalName: "original-name.jpg",
      path: "../../path",
      type: "jpg",
    });

    const file = inMemoryFileRepository.repository[0];
    const user = new User("John Doe", "john.doe@email.com", "123456");
    const profile = new Profile("description about user profile", file, user);

    inMemoryProfileRepository.create(profile);

    expect(async () => {
      return await updateProfileUseCase.execute({
        id: "invalid-uuid",
        bio: "description about user profile",
        fileId: String(file.id),
      });
    }).rejects.toThrow(NotFoundException);
  });
});
