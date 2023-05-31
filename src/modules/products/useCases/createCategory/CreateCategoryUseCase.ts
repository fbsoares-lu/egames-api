import { BadRequestException } from "../../../../errors/BadRequestException";
import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const nameAlreadyExists = await this.categoriesRepository.findByName(name);

    if (nameAlreadyExists) {
      throw new BadRequestException("name already exists!");
    }

    const category = new Category(name, description);
    await this.categoriesRepository.create(category);
  }
}
