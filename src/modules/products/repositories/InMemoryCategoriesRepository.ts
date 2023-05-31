import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../entities/Category";
import { ICategoriesRepository } from "./ICategoriesRepository";

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  public repository: Category[];

  constructor() {
    this.repository = [];
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.repository.find((item) => item.name === name);
    return category ?? null;
  }

  async find(): Promise<Category[]> {
    return this.repository;
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.repository.find((item) => item.id === id);
    return category ?? null;
  }

  async create(data: Category): Promise<void> {
    this.repository.push(data);
  }

  async update(data: Category, payload: ICreateCategoryDTO): Promise<void> {
    const categoryIndex = this.repository.findIndex(
      (item) => item.id === data.id
    );

    this.repository[categoryIndex].name = payload.name;
    this.repository[categoryIndex].description = payload.description;
  }

  async delete(data: Category): Promise<void> {
    const categoryIndex = this.repository.findIndex(
      (item) => item.id === data.id
    );

    this.repository[categoryIndex].deletedAt = new Date();
  }
}
