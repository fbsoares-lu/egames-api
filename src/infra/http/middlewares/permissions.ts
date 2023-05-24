import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../../modules/accounts/repositories/implementation/UserRepository";
import { NotFoundException } from "../../../errors/NotFoundException";
import { UnauthorizedException } from "../../../errors/UnauthorizedException";

export function can(permissionsRoutes: string[]) {
  return async (request: Request, reponse: Response, next: NextFunction) => {
    const { userId } = request;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException("user does not exist!");
    }

    if (user.permissions.length === 0) {
      throw new UnauthorizedException("user does not have permission!");
    }

    const permissionsExists = user.permissions
      .map((permission) => permission.name)
      .some((permission) => permissionsRoutes.includes(permission));

    if (!permissionsExists) {
      throw new UnauthorizedException("user does not have permission!");
    }

    return next();
  };
}

export function is(rolesRoutes: string[]) {
  return async (request: Request, reponse: Response, next: NextFunction) => {
    const { userId } = request;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException("user does not exist!");
    }

    if (user.roles.length === 0) {
      throw new UnauthorizedException("user does not have role!");
    }

    const rolesExists = user.roles
      .map((role) => role.name)
      .some((role) => rolesRoutes.includes(role));

    if (!rolesExists) {
      throw new UnauthorizedException("user does not have role!");
    }

    return next();
  };
}
