import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email } = request.body;

    const user = await this.updateUserUseCase.execute({
      id,
      email,
      name,
    });

    return response.status(201).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
  }
}
