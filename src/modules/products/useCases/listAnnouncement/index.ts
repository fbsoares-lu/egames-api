import { AnnouncementRepository } from "../../repositories/implements/AnnouncementRepository";
import { ListAnnouncementController } from "./ListAnnouncementController";
import { ListAnnouncementUseCase } from "./ListAnnouncementUseCase";

const announcementRepository = new AnnouncementRepository();
const listAnnouncementUseCase = new ListAnnouncementUseCase(
  announcementRepository
);
const listAnnouncementController = new ListAnnouncementController(
  listAnnouncementUseCase
);

export { listAnnouncementController };
