import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { Category } from "../../entities/Category";
import { InMemoryCategoriesRepository } from "../../repositories/InMemoryCategoriesRepository";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let updateCategoryUseCase: UpdateCategoryUseCase;

describe("Update categories", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    updateCategoryUseCase = new UpdateCategoryUseCase(
      inMemoryCategoriesRepository
    );
  });

  it("should be able to update a category", async () => {
    const category = new Category("Cars", "All kind of car");
    await inMemoryCategoriesRepository.create(category);

    await updateCategoryUseCase.execute({
      id: String(inMemoryCategoriesRepository.repository[0].id),
      name: "Houses",
      description: "All fid of houses",
    });

    expect(inMemoryCategoriesRepository.repository[0].name).toBe("Houses");
  });

  it("should not be able to update a category when already exists the same name", async () => {
    const categoryOne = new Category("Cars", "All kind of car");
    await inMemoryCategoriesRepository.create(categoryOne);

    const categoryTwo = new Category("Houses", "All kind of House");
    await inMemoryCategoriesRepository.create(categoryTwo);

    expect(async () => {
      return await updateCategoryUseCase.execute({
        id: String(inMemoryCategoriesRepository.repository[0].id),
        name: "Houses",
        description: "All fid of houses",
      });
    }).rejects.toThrow(BadRequestException);
  });

  it("should be able to update a category wich already has the same name", async () => {
    const categoryOne = new Category("Cars", "All kind of car");
    await inMemoryCategoriesRepository.create(categoryOne);

    const categoryTwo = new Category("Houses", "All kind of House");
    await inMemoryCategoriesRepository.create(categoryTwo);

    await updateCategoryUseCase.execute({
      id: String(inMemoryCategoriesRepository.repository[0].id),
      name: "Cars",
      description: "All kind of car",
    });

    expect(inMemoryCategoriesRepository.repository[0].name).toBe("Cars");
  });

  it("should not be able to update a invalid category wich does not exists", async () => {
    expect(async () => {
      return await updateCategoryUseCase.execute({
        id: "invalid-uuid",
        name: "Cars",
        description: "All kind of car",
      });
    }).rejects.toThrow(NotFoundException);
  });
});
