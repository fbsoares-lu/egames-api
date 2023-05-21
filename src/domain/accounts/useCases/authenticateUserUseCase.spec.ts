import { UnauthorizedException } from "../../../errors/UnauthorizedException";
import { EncryptedPassword } from "../../../helpers/EncryptedPassword";
import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate User", () => {
  it("should be able to authenticate user", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository
    );
    const encryptedPassword = await EncryptedPassword.handle("password");

    await inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@mail.com",
      password: encryptedPassword,
    });

    const token = await authenticateUserUseCase.execute({
      email: inMemoryUserRepository.repository[0].email,
      password: "password",
    });

    expect(token.user.email).toEqual("john.doe@mail.com");
    expect(token.token).toBeTruthy();
  });

  it("should not be able to authenticate user with wrong email", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository
    );
    const encryptedPassword = await EncryptedPassword.handle("password");

    await inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@mail.com",
      password: encryptedPassword,
    });

    expect(async () => {
      const token = await authenticateUserUseCase.execute({
        email: "incorrect@email.com",
        password: "password",
      });
      return token;
    }).rejects.toThrow(UnauthorizedException);
  });

  it("should not be able to authenticate user with wrong password", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository
    );
    const encryptedPassword = await EncryptedPassword.handle("password");

    await inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@mail.com",
      password: encryptedPassword,
    });

    expect(async () => {
      const token = await authenticateUserUseCase.execute({
        email: inMemoryUserRepository.repository[0].email,
        password: "incorret_password",
      });
      return token;
    }).rejects.toThrow(UnauthorizedException);
  });
});
