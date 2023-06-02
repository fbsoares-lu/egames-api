import { Router, Request, Response } from "express";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { listAnnouncementController } from "../../../modules/products/useCases/listAnnouncement";
import { showAnnouncementController } from "../../../modules/products/useCases/showAnnouncement";
import { CreateAnnouncementValidation } from "../validations/products/CreateAnnouncementValidation";
import { createAnnouncementController } from "../../../modules/products/useCases/createAnnouncement";
import { updateAnnouncementController } from "../../../modules/products/useCases/updateAnnouncement";
import { deleteAnnouncementController } from "../../../modules/products/useCases/deleteAnnouncement";
import { ensuredCanChangeAnnouncement } from "../middlewares/ensuredCanChangeAnnouncement";

const announcementRoutes = Router();

announcementRoutes.get(
  "/",
  ensuredAuthentication,
  (request: Request, response: Response) => {
    return listAnnouncementController.handle(request, response);
  }
);

announcementRoutes.get(
  "/:id",
  ensuredAuthentication,
  (request: Request, response: Response) => {
    return showAnnouncementController.handle(request, response);
  }
);

announcementRoutes.post(
  "/",
  ensuredAuthentication,
  CreateAnnouncementValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createAnnouncementController.handle(request, response);
  }
);

announcementRoutes.put(
  "/:id",
  ensuredAuthentication,
  ensuredCanChangeAnnouncement,
  (request: Request, response: Response) => {
    return updateAnnouncementController.handle(request, response);
  }
);

announcementRoutes.delete(
  "/:id",
  ensuredAuthentication,
  ensuredCanChangeAnnouncement,
  (request: Request, response: Response) => {
    return deleteAnnouncementController.handle(request, response);
  }
);

export { announcementRoutes };
