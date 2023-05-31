import { Category } from "../../entities/Category";
import { PaymentOption } from "../../entities/PaymentOption";
import { InMemoryCategoriesRepository } from "../../repositories/InMemoryCategoriesRepository";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let listCategoryUseCase: ListCategoryUseCase;

describe("List categories", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    listCategoryUseCase = new ListCategoryUseCase(inMemoryCategoriesRepository);
  });

  it("should be able to list all payment options", async () => {
    const categoryOne = new Category("Cars", "All kind of cars");
    await inMemoryCategoriesRepository.create(categoryOne);

    const categoryTwo = new Category("Houses", "All kind of houses");
    await inMemoryCategoriesRepository.create(categoryTwo);

    const categoryTree = new Category("Appartment", "All kind of appartment");
    await inMemoryCategoriesRepository.create(categoryTree);

    const categories = await listCategoryUseCase.execute();
    expect(categories.length).toBe(3);
  });
});
