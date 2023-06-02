import { NextFunction, Request, Response } from "express";

import { SocialNetworkRepository } from "../../../modules/accounts/repositories/implementation/SocialNetworkRepository";
import { ForbiddenException } from "../../../errors/ForbiddenException";
import { BadRequestException } from "../../../errors/BadRequestException";

export async function ensuredCanChangeSocialNetwork(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { userId } = request;
  const { id } = request.params;

  const repository = new SocialNetworkRepository();
  const socialNetwork = await repository.findById(id);

  if (!socialNetwork?.profile) {
    throw new BadRequestException("user has not an profile!");
  }

  const canChangeSocialNetworkreponse =
    socialNetwork?.profile.user.id === userId;

  if (!canChangeSocialNetworkreponse) {
    throw new ForbiddenException("user has not permission");
  }

  return next();
}
