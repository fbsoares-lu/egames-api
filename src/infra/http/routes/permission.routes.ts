import { Router, Request, Response } from "express";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { CreatePermissionValidation } from "../validations/accounts/CreatePermissionValidation";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { createPermissionController } from "../../../modules/accounts/useCases/createPermission";
import { is } from "../middlewares/permissions";

const permissionRoutes = Router();

permissionRoutes.post(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  CreatePermissionValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createPermissionController.handle(request, response);
  }
);

export { permissionRoutes };
