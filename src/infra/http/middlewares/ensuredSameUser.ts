import { NextFunction, Request, Response } from "express";

import { ForbiddenException } from "../../../errors/ForbiddenException";
import { UserRepository } from "../../../modules/accounts/repositories/implementation/UserRepository";

export async function ensuredSameUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { userId } = request;
  const { id } = request.params;

  const repository = new UserRepository();
  const user = await repository.findById(userId);
  const hasAdminRole = user?.roles.find((item) => item.name === "admin");

  const isSameUser = userId === id;

  if (!isSameUser && !hasAdminRole) {
    throw new ForbiddenException("user has not permission");
  }

  return next();
}
