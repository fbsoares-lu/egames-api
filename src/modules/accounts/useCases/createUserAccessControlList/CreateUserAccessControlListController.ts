import { Request, Response } from "express";
import { CreateUserAccessControlListUseCase } from "./CreateUserAccessControlListUseCase";

export class CreateUserAccessControlListController {
  constructor(
    private createUserAccessControlList: CreateUserAccessControlListUseCase
  ) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { roles, permissions } = request.body;

    await this.createUserAccessControlList.execute({
      userId: id,
      permissions,
      roles,
    });

    return response.status(201).send();
  }
}
