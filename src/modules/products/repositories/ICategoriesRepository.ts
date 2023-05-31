import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../entities/Category";

export abstract class ICategoriesRepository {
  abstract find(): Promise<Category[]>;
  abstract findById(id: string): Promise<Category | null>;
  abstract findByName(name: string): Promise<Category | null>;
  abstract create(data: Category): Promise<void>;
  abstract update(data: Category, payload: ICreateCategoryDTO): Promise<void>;
  abstract delete(data: Category): Promise<void>;
}
