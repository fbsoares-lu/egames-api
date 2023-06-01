import { AnnouncementRepository } from "../../repositories/implements/AnnouncementRepository";
import { ShowAnnouncementController } from "./ShowAnnouncementController";
import { ShowAnnouncementUseCase } from "./ShowAnnouncementUseCase";

const announcementRepository = new AnnouncementRepository();
const showAnnouncementUseCase = new ShowAnnouncementUseCase(
  announcementRepository
);
const showAnnouncementController = new ShowAnnouncementController(
  showAnnouncementUseCase
);

export { showAnnouncementController };
