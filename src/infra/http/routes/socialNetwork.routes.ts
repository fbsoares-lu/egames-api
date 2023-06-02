import { Router, Request, Response } from "express";

import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { is } from "../middlewares/permissions";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { createSocialNetworkController } from "../../../modules/accounts/useCases/createSocialNetwork";
import { updateSocialNetworkController } from "../../../modules/accounts/useCases/updateSocialNetwork";
import { deleteSocialNetworkController } from "../../../modules/accounts/useCases/deleteSocialNetwork";
import { ensuredCanChangeSocialNetwork } from "../middlewares/ensuredCanChangeSocialNetwork";
import { CreateSocialNetworkValidation } from "../validations/accounts/CreateSocialNetworkValidation";

const socialNetworksRoutes = Router();

socialNetworksRoutes.post(
  "/",
  ensuredAuthentication,
  is(["admin", "customer"]),
  CreateSocialNetworkValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createSocialNetworkController.handle(request, response);
  }
);

socialNetworksRoutes.put(
  "/:id",
  ensuredAuthentication,
  ensuredCanChangeSocialNetwork,
  is(["admin", "customer"]),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return updateSocialNetworkController.handle(request, response);
  }
);

socialNetworksRoutes.delete(
  "/:id",
  ensuredAuthentication,
  ensuredCanChangeSocialNetwork,
  is(["admin", "customer"]),
  (request: Request, response: Response) => {
    return deleteSocialNetworkController.handle(request, response);
  }
);

export { socialNetworksRoutes };
