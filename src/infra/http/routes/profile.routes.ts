import { Router, Request, Response } from "express";

import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { is } from "../middlewares/permissions";
import { createProfileController } from "../../../modules/accounts/useCases/createProfile";
import { updateProfileController } from "../../../modules/accounts/useCases/updateProfile";
import { ensuredCanChangeProfile } from "../middlewares/ensuredCanChangeProfile";
import { CreateProfileValidation } from "../validations/accounts/CreateProfileValidation";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { UpdateProfileValidation } from "../validations/accounts/UpdateProfileValidation";

const profilesRoutes = Router();

profilesRoutes.post(
  "/",
  ensuredAuthentication,
  CreateProfileValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createProfileController.handle(request, response);
  }
);

profilesRoutes.put(
  "/:id",
  ensuredAuthentication,
  ensuredCanChangeProfile,
  is(["customer"]),
  UpdateProfileValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return updateProfileController.handle(request, response);
  }
);

export { profilesRoutes };
