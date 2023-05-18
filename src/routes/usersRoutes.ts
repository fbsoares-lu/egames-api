import { Router } from "express";

import { UserController } from "../domain/users/controllers/UserController";
import { UserService } from "../domain/users/service/UserService";
import { UserRepository } from "../domain/users/repositories/implementation/UserRepository";

const usersRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

usersRoutes.post("/", (request, response) => {
  return userController.create(request, response);
});

export { usersRoutes };
