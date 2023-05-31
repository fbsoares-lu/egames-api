import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  private createCategoryUseCase: CreateCategoryUseCase;

  constructor(createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase;
  }

  public async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    await this.createCategoryUseCase.execute({ name, description });
    return response.status(201).send();
  }
}
