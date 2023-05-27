import { Router, Request, Response } from "express";

import { listSocialNetworkTypeController } from "../../../modules/accounts/useCases/listSocialNetworkType";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { is } from "../middlewares/permissions";
import { CreateSocialNetworkTypeValidation } from "../validations/accounts/CreateSocialNetworkTypeValidation";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { createSocialNetworkTypeController } from "../../../modules/accounts/useCases/createSocialNetworkType";
import { UpdateSocialNetworkTypeValidation } from "../validations/accounts/UpdateSocialNetworkTypeValidation";
import { updateSocialNetworkTypeController } from "../../../modules/accounts/useCases/updateSocialNetworkType";
import { deleteSocialNetworkTypeController } from "../../../modules/accounts/useCases/deleteSocialNetworkType";

const socialNetworkTypesRoutes = Router();

socialNetworkTypesRoutes.get(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  (request: Request, response: Response) => {
    return listSocialNetworkTypeController.handle(request, response);
  }
);

socialNetworkTypesRoutes.post(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  CreateSocialNetworkTypeValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createSocialNetworkTypeController.handle(request, response);
  }
);

socialNetworkTypesRoutes.put(
  "/:id",
  ensuredAuthentication,
  is(["admin"]),
  UpdateSocialNetworkTypeValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return updateSocialNetworkTypeController.handle(request, response);
  }
);

socialNetworkTypesRoutes.delete(
  "/:id",
  ensuredAuthentication,
  is(["admin"]),
  (request: Request, response: Response) => {
    return deleteSocialNetworkTypeController.handle(request, response);
  }
);

export { socialNetworkTypesRoutes };
