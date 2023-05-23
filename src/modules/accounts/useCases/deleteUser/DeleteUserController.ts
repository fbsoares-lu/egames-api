import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    await this.deleteUserUseCase.execute({ id });

    return response.status(201).send();
  }
}
