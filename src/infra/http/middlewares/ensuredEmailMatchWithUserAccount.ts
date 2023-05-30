import { NextFunction, Request, Response } from "express";

import { ForbiddenException } from "../../../errors/ForbiddenException";
import { ProfileRepository } from "../../../modules/accounts/repositories/implementation/ProfileRepository";
import { UserRepository } from "../../../modules/accounts/repositories/implementation/UserRepository";

export async function ensuredEmailMatchWithUserAccount(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { userId } = request;
  const { email } = request.body;

  const repository = new UserRepository();

  const user = await repository.findById(userId);

  if (user?.email !== email) {
    throw new ForbiddenException("user has not permission to edit!");
  }

  return next();
}
