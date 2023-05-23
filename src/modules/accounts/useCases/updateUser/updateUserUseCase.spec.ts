import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

describe("Update User", () => {
  it("should be able to update existing user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository);

    inMemoryUserRepository.create({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "123456",
    });

    const updatedUser = await updateUserUseCase.execute({
      id: String(inMemoryUserRepository.repository[0].id),
      email: "john.doe.updated@mail.com",
      name: "John Doe Up",
    });

    expect(updatedUser.email).toEqual("john.doe.updated@mail.com");
    expect(updatedUser.name).toEqual("John Doe Up");
  });

  it("should not be able to update a user that does not exist", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository);

    expect(async () => {
      const updatedUser = await updateUserUseCase.execute({
        id: "fake-uuid",
        email: "john.doe.updated@mail.com",
        name: "John Doe Up",
      });

      return updatedUser;
    }).rejects.toThrow(NotFoundException);
  });

  it("should not be able to update a existing email", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository);

    inMemoryUserRepository.create({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "123456",
    });

    inMemoryUserRepository.create({
      email: "doe.john@mail.com",
      name: "Doe John",
      password: "456789",
    });

    expect(async () => {
      const updatedUser = await updateUserUseCase.execute({
        id: String(inMemoryUserRepository.repository[0].id),
        email: "doe.john@mail.com",
        name: "John Doe",
      });

      return updatedUser;
    }).rejects.toThrow(BadRequestException);
  });

  it("should be able to update the same email", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository);

    inMemoryUserRepository.create({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "123456",
    });

    const updatedUser = await updateUserUseCase.execute({
      id: String(inMemoryUserRepository.repository[0].id),
      email: "john.doe@mail.com",
      name: "John Doe",
    });

    expect(updatedUser.email).toEqual("john.doe@mail.com");
  });
});
