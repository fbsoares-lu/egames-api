import { Request, Response } from "express";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

export class DeleteCategoryController {
  private deleteCategoryUseCase: DeleteCategoryUseCase;

  constructor(deleteCategoryUseCase: DeleteCategoryUseCase) {
    this.deleteCategoryUseCase = deleteCategoryUseCase;
  }

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    await this.deleteCategoryUseCase.execute(id);
    return response.status(200).send();
  }
}
