import { CategoriesRepository } from "../../repositories/implements/CategoriesRepository";
import { DeleteCategoryController } from "./DeleteCategoryController";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

const categoriesRepository = new CategoriesRepository();
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository);
const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase
);

export { deleteCategoryController };
