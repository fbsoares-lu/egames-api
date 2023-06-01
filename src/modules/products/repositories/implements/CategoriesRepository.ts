import { In, Repository } from "typeorm";
import { IPaymentOptionsRepository } from "../IPaymentOptionsRepository";
import { PaymentOption } from "../../entities/PaymentOption";
import { AppDataSource } from "../../../../infra/database";
import { ICategoriesRepository } from "../ICategoriesRepository";
import { Category } from "../../entities/Category";
import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async findByIds(ids: string[]): Promise<Category[]> {
    const categories = await this.repository.findBy({ id: In(ids) });
    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.repository.findOneBy({ name });
  }

  async find(): Promise<Category[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Category | null> {
    return await this.repository.findOneBy({ id });
  }

  async create(data: Category): Promise<void> {
    await this.repository.save(data);
  }

  async update(data: Category, payload: ICreateCategoryDTO): Promise<void> {
    data.name = payload.name;
    data.description = payload.description;

    await this.repository.save(data);
  }

  async delete(data: Category): Promise<void> {
    data.deletedAt = new Date();
    await this.repository.save(data);
  }
}
