import { Router, Request, Response } from "express";

import { listSocialNetworkController } from "../../../modules/accounts/useCases/listSocialNetworkType";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { is } from "../middlewares/permissions";
import { CreateSocialNetworkTypeValidation } from "../validations/accounts/CreateSocialNetworkTypeValidation";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { createSocialNetworkController } from "../../../modules/accounts/useCases/createSocialNetworkType";
import { UpdateSocialNetworkTypeValidation } from "../validations/accounts/UpdateSocialNetworkTypeValidation";
import { updateSocialNetworkController } from "../../../modules/accounts/useCases/updateSocialNetworkType";
import { deleteSocialNetworkController } from "../../../modules/accounts/useCases/deleteSocialNetworkType";

const socialNetworkTypesRoutes = Router();

socialNetworkTypesRoutes.get(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  (request: Request, response: Response) => {
    return listSocialNetworkController.handle(request, response);
  }
);

socialNetworkTypesRoutes.post(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  CreateSocialNetworkTypeValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createSocialNetworkController.handle(request, response);
  }
);

socialNetworkTypesRoutes.put(
  "/:id",
  ensuredAuthentication,
  is(["admin"]),
  UpdateSocialNetworkTypeValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return updateSocialNetworkController.handle(request, response);
  }
);

socialNetworkTypesRoutes.delete(
  "/:id",
  ensuredAuthentication,
  is(["admin"]),
  (request: Request, response: Response) => {
    return deleteSocialNetworkController.handle(request, response);
  }
);

export { socialNetworkTypesRoutes };
