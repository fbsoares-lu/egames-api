import { NextFunction, Request, Response } from "express";

import { ForbiddenException } from "../../../errors/ForbiddenException";
import { ProfileRepository } from "../../../modules/accounts/repositories/implementation/ProfileRepository";
import { UserRepository } from "../../../modules/accounts/repositories/implementation/UserRepository";
import { NotFoundException } from "../../../errors/NotFoundException";
import { AnnouncementRepository } from "../../../modules/products/repositories/implements/AnnouncementRepository";

export async function ensuredCanChangeAnnouncement(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { userId } = request;
  const { id } = request.body;

  const announcementRepository = new AnnouncementRepository();
  const announcement = await announcementRepository.findById(id);

  if (!announcement) {
    throw new NotFoundException("announcement not found!");
  }

  if (announcement.user.id !== userId) {
    throw new NotFoundException("user has not permission!");
  }

  return next();
}
