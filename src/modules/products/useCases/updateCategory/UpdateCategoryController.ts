import { Request, Response } from "express";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

export class UpdateCategoryController {
  private updateCategoryUseCase: UpdateCategoryUseCase;

  constructor(updateCategoryUseCase: UpdateCategoryUseCase) {
    this.updateCategoryUseCase = updateCategoryUseCase;
  }

  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description } = request.body;

    await this.updateCategoryUseCase.execute({ id, name, description });
    return response.status(204).send();
  }
}
