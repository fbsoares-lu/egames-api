import { Router, Request, Response } from "express";

import { createRoleController } from "../../../modules/accounts/useCases/createRole";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { CreateRoleValidation } from "../validations/accounts/CreateRoleValidation";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";

const rolesRoutes = Router();

rolesRoutes.post(
  "/",
  ensuredAuthentication,
  CreateRoleValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createRoleController.handle(request, response);
  }
);

export { rolesRoutes };
