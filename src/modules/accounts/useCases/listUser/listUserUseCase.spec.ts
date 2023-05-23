import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { ListUserUseCase } from "./ListUserUseCase";

describe("List Users", () => {
  it("should be able to list all users", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const listUserUseCase = new ListUserUseCase(inMemoryUserRepository);

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

    inMemoryUserRepository.create({
      email: "john.doe3@mail.com",
      name: "John Doe Three",
      password: "123456",
    });

    const paginationResponse = await listUserUseCase.execute({
      page: 1,
      pageSize: 0,
    });
    expect(paginationResponse.total).toBe(3);
  });
});
