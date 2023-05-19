import { Router } from "express";

import { UserController } from "../domain/users/controllers/UserController";
import { UserService } from "../domain/users/service/UserService";
import { UserRepository } from "../domain/users/repositories/implementation/UserRepository";

const usersRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

usersRoutes.get("/:id", (request, response) => {
  return userController.show(request, response);
});
usersRoutes.get("/", (request, response) => {
  return userController.list(request, response);
});
usersRoutes.post("/", (request, response) => {
  return userController.create(request, response);
});
usersRoutes.put("/:id", (request, response) => {
  return userController.update(request, response);
});
usersRoutes.delete("/:id", (request, response) => {
  return userController.delete(request, response);
});

export { usersRoutes };
