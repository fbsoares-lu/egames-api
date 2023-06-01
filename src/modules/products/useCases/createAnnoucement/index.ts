import { UserRepository } from "../../../accounts/repositories/implementation/UserRepository";
import { FileRepository } from "../../../files/repositories/implementation/FileRepository";
import { AnnouncementRepository } from "../../repositories/implements/AnnouncementRepository";
import { CategoriesRepository } from "../../repositories/implements/CategoriesRepository";
import { PaymentOptionsRepository } from "../../repositories/implements/PaymentOptionsRepository";
import { CreateAnnouncementController } from "./CreateAnnouncementController";
import { CreateAnnouncementUseCase } from "./CreateAnnouncementUseCase";

const announcementRepository = new AnnouncementRepository();
const userRepository = new UserRepository();
const categoriesRepository = new CategoriesRepository();
const paymentOptionsRepository = new PaymentOptionsRepository();
const fileRepository = new FileRepository();

const createAnnouncementUseCase = new CreateAnnouncementUseCase(
  announcementRepository,
  userRepository,
  categoriesRepository,
  paymentOptionsRepository,
  fileRepository
);
const createAnnouncementController = new CreateAnnouncementController(
  createAnnouncementUseCase
);

export { createAnnouncementController };
