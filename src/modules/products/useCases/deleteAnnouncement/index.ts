import { AnnouncementRepository } from "../../repositories/implements/AnnouncementRepository";
import { DeleteAnnouncementController } from "./DeleteAnnouncementController";
import { DeleteAnnouncementUseCase } from "./DeleteAnnouncementUseCase";

const announcementRepository = new AnnouncementRepository();
const deleteAnnouncementUseCase = new DeleteAnnouncementUseCase(
  announcementRepository
);
const deleteAnnouncementController = new DeleteAnnouncementController(
  deleteAnnouncementUseCase
);

export { deleteAnnouncementController };
