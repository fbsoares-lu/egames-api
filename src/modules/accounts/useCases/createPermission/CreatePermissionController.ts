import { Request, Response } from "express";
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";
export class CreatePermissionController {
  constructor(private createPermissionUseCase: CreatePermissionUseCase) {}

  public async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    await this.createPermissionUseCase.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}
