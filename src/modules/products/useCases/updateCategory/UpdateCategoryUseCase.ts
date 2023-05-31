import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { PaymentOption } from "../../entities/PaymentOption";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IPaymentOptionsRepository } from "../../repositories/IPaymentOptionsRepository";

interface IRequest {
  id: string;
  name: string;
  description: string;
}

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ id, name, description }: IRequest): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFoundException("category not found!");
    }

    const nameAlreadyExists = await this.categoriesRepository.findByName(name);

    if (nameAlreadyExists && nameAlreadyExists.id !== id) {
      throw new BadRequestException("payment type already exists!");
    }

    await this.categoriesRepository.update(category, { name, description });
  }
}
