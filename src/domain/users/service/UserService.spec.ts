import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository";
import { UserService } from "./UserService";

describe("User service", () => {
  it("should be able to encrypt the user password", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userService = new UserService(inMemoryUserRepository);

    const encryptedPassword = await userService.encryptedPassword("password");
    expect(encryptedPassword).toBeTruthy();
  });

  it("should be able to create a new user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const userService = new UserService(inMemoryUserRepository);

    await userService.createUser({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "123456",
    });

    expect(inMemoryUserRepository.repository[0].name).toEqual("John Doe");
  });
});
