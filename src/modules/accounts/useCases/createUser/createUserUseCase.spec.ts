import { BadRequestException } from "../../../../errors/BadRequestException";
import { EncryptedPassword } from "../../../../helpers/EncryptedPassword";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User", () => {
  it("should be able to create a new user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);

    await createUserUseCase.execute({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "123456",
    });

    expect(inMemoryUserRepository.repository[0].name).toEqual("John Doe");
  });

  it("should not be able to create a user with the same email", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);

    await createUserUseCase.execute({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "123456",
    });

    expect(async () => {
      return await createUserUseCase.execute({
        email: "john.doe@mail.com",
        name: "John Doe",
        password: "123456",
      });
    }).rejects.toThrow(BadRequestException);
  });

  it("should be able to encrypt the user password", async () => {
    const encryptedPassword = await EncryptedPassword.handle("password");
    expect(encryptedPassword).toBeTruthy();
  });
});
