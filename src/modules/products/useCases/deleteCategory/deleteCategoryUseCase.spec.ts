import { NotFoundException } from "../../../../errors/NotFoundException";
import { Category } from "../../entities/Category";
import { InMemoryCategoriesRepository } from "../../repositories/InMemoryCategoriesRepository";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe("Delete categories", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      inMemoryCategoriesRepository
    );
  });

  it("should be able to delete a category", async () => {
    const category = new Category("Cars", "All kind of car that...");
    await inMemoryCategoriesRepository.create(category);

    await deleteCategoryUseCase.execute(
      String(inMemoryCategoriesRepository.repository[0].id)
    );

    expect(inMemoryCategoriesRepository.repository[0].deletedAt).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to delete a invalid category wich does not exists", async () => {
    expect(async () => {
      return await deleteCategoryUseCase.execute("invalid_uuid");
    }).rejects.toThrow(NotFoundException);
  });
});
