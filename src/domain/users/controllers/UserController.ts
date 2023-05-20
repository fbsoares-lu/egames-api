import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { UserViewModel } from "./view-models/UserViewModel";

export class UserController {
  constructor(private userService: UserService) {}

  public async list(request: Request, response: Response) {
    const users = await this.userService.listUsers();
    return response.status(201).json(users);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await this.userService.showUser(id);
    return response.status(201).json(user);
  }

  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    await this.userService.createUser({
      email,
      name,
      password,
    });

    return response.status(201).send();
  }

  public async update(request: Request, response: Response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const user = await this.userService.updateUser({
      id,
      name,
      email,
    });

    return response.status(202).json(UserViewModel.toHTTP(user));
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    await this.userService.deleteUser(id);
    return response.status(200).send();
  }
}
