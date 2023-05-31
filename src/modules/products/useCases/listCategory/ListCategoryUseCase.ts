import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class ListCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }
}
