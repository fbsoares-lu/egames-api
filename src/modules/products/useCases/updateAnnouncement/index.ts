import { FileRepository } from "../../../files/repositories/implementation/FileRepository";
import { AnnouncementRepository } from "../../repositories/implements/AnnouncementRepository";
import { CategoriesRepository } from "../../repositories/implements/CategoriesRepository";
import { PaymentOptionsRepository } from "../../repositories/implements/PaymentOptionsRepository";
import { UpdateAnnouncementController } from "./UpdateAnnouncementController";
import { UpdateAnnouncementUseCase } from "./UpdateAnnouncementUseCase";

const announcementRepository = new AnnouncementRepository();
const categoriesRepository = new CategoriesRepository();
const paymentOptionsRepository = new PaymentOptionsRepository();
const fileRepository = new FileRepository();

const updateAnnouncementUseCase = new UpdateAnnouncementUseCase(
  announcementRepository,
  categoriesRepository,
  paymentOptionsRepository,
  fileRepository
);
const updateAnnouncementController = new UpdateAnnouncementController(
  updateAnnouncementUseCase
);

export { updateAnnouncementController };
