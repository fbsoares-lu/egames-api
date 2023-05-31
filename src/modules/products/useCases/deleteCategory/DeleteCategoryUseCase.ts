import { NotFoundException } from "../../../../errors/NotFoundException";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException("paymento option not found!");
    }

    await this.categoryRepository.delete(category);
  }
}
