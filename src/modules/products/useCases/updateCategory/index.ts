import { CategoriesRepository } from "../../repositories/implements/CategoriesRepository";
import { UpdateCategoryController } from "./UpdateCategoryController";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

const categoriesRepository = new CategoriesRepository();
const updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepository);
const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase
);

export { updateCategoryController };
