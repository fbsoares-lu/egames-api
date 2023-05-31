import { BadRequestException } from "../../../../errors/BadRequestException";
import { Category } from "../../entities/Category";
import { InMemoryCategoriesRepository } from "../../repositories/InMemoryCategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create categories", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoriesRepository
    );
  });

  it("should be able to create a new category", async () => {
    await createCategoryUseCase.execute({
      name: "Cars",
      description: "All kind of car",
    });
    expect(inMemoryCategoriesRepository.repository[0].id).toBeTruthy();
  });

  it("should not be able to create a new category", async () => {
    const category = new Category("Cars", "All kind of car");

    inMemoryCategoriesRepository.create(category);

    expect(async () => {
      return await createCategoryUseCase.execute({
        name: "Cars",
        description: "All kind of car",
      });
    }).rejects.toThrow(BadRequestException);
  });
});
