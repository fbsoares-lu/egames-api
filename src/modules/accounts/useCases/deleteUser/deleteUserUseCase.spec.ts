import { NotFoundException } from "../../../../errors/NotFoundException";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

let inMemoryUserRepository: InMemoryUserRepository;
let deleteUserUseCase: DeleteUserUseCase;

describe("Delete User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    deleteUserUseCase = new DeleteUserUseCase(inMemoryUserRepository);
  });
  it("should be able to delete user", async () => {
    inMemoryUserRepository.create({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "123456",
    });

    const user = inMemoryUserRepository.repository[0];

    const userId = user.id as string;
    await deleteUserUseCase.execute({ id: userId });

    expect(user.deletedAt).toEqual(expect.any(Date));
  });

  it("should not be able to delete a user that does not exist", async () => {
    expect(async () => {
      return await deleteUserUseCase.execute({ id: "uuid-not-exists" });
    }).rejects.toThrow(NotFoundException);
  });
});
