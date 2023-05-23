import { Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
export class CreateRoleController {
  constructor(private createRoleUseCase: CreateRoleUseCase) {}

  public async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    await this.createRoleUseCase.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}
