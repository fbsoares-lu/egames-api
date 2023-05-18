import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

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
      return response.json({
        error: error,
      });
    }
  }
}
