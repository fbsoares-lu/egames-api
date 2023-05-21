import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

describe("Update User", () => {
  it("should be able to update existent user", async () => {
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
});
