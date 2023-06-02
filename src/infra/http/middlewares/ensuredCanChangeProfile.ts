import { NextFunction, Request, Response } from "express";

import { ForbiddenException } from "../../../errors/ForbiddenException";
import { ProfileRepository } from "../../../modules/accounts/repositories/implementation/ProfileRepository";

export async function ensuredCanChangeProfile(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { userId } = request;
  const { id } = request.body;

  const repository = new ProfileRepository();
  const profile = await repository.findById(id);

  if (profile?.user.id !== userId) {
    throw new ForbiddenException("user has not permission");
  }

  return next();
}
