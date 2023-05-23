import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";

import { UnauthorizedException } from "../../../errors/UnauthorizedException";

export async function ensuredAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException("token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    verify(token, String(process.env.PRIVATE_ACCESS_KEY));

    const decoded = decode(token);
    request.userId = String(decoded?.sub);

    return next();
  } catch (error) {
    const errorFormatted = error as Error;
    throw new UnauthorizedException(errorFormatted.message);
  }
}
