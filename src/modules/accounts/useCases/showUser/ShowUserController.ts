import { Request, Response } from "express";
import { ShowUserUseCase } from "./ShowUserUseCase";

export class ShowUserController {
  constructor(private showUserUseCase: ShowUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    const user = await this.showUserUseCase.execute({ id });

    return response.status(201).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
        permissions: user.permissions,
        roles: user.roles,
        profile: user.profile,
        announcements: user.announcements,
      },
    });
  }
}
