import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return response.status(201).send();
  }
}
