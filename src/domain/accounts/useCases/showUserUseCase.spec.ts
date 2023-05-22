import { NotFoundException } from "../../../errors/NotFoundException";
import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository";
import { ShowUserUseCase } from "./ShowUserUseCase";

describe("Show Users", () => {
  it("should be able to find a user by id", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const showUserUseCase = new ShowUserUseCase(inMemoryUserRepository);

    inMemoryUserRepository.create({
      email: "john.doe1@mail.com",
      name: "John Doe One",
      password: "123456",
    });

    inMemoryUserRepository.create({
      email: "john.doe2@mail.com",
      name: "John Doe Two",
      password: "123456",
    });

    const user = await showUserUseCase.execute({
      id: String(inMemoryUserRepository.repository[0].id),
    });

    expect(user.id).toEqual(String(inMemoryUserRepository.repository[0].id));
  });

  it("should not be able to find a user that does not exist", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const showUserUseCase = new ShowUserUseCase(inMemoryUserRepository);

    expect(async () => {
      return await showUserUseCase.execute({ id: "uuid-not-exists" });
    }).rejects.toThrow(NotFoundException);
  });
});
