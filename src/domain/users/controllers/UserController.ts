import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
  constructor(private userService: UserService) {}

  public async create(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      await this.userService.createUser({
        email,
        name,
        password,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(500).json({
        error: error.message,
      });
    }
  }
}
