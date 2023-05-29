import { Router, Request, Response } from "express";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { is } from "../middlewares/permissions";
import { createProfileController } from "../../../modules/accounts/useCases/createProfile";
import { updateProfileController } from "../../../modules/accounts/useCases/updateProfile";
import { ensuredCanChangeProfile } from "../middlewares/ensuredCanChangeProfile";

const profilesRoutes = Router();

profilesRoutes.post(
  "/",
  ensuredAuthentication,
  (request: Request, response: Response) => {
    return createProfileController.handle(request, response);
  }
);

profilesRoutes.put(
  "/:id",
  ensuredAuthentication,
  ensuredCanChangeProfile,
  is(["customer"]),
  (request: Request, response: Response) => {
    return updateProfileController.handle(request, response);
  }
);

export { profilesRoutes };
