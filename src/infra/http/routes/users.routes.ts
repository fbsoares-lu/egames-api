import { Router, Request, Response } from "express";

import { createUserController } from "../../../modules/accounts/useCases/createUser";
import { updateUserController } from "../../../modules/accounts/useCases/updateUser";
import { deleteUserController } from "../../../modules/accounts/useCases/deleteUser";
import { listUserController } from "../../../modules/accounts/useCases/listUser";
import { showUserController } from "../../../modules/accounts/useCases/showUser";
import { CreateUserValidation } from "../validations/accounts/CreateUserValidation";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { createUserAccessControlListController } from "../../../modules/accounts/useCases/createUserAccessControlList";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { can, is } from "../middlewares/permissions";
import { ensuredSameUser } from "../middlewares/ensuredSameUser";

const usersRoutes = Router();

usersRoutes.get(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  (request, response) => {
    return listUserController.handle(request, response);
  }
);

usersRoutes.get(
  "/:id",
  ensuredAuthentication,
  ensuredSameUser,
  (request, response) => {
    return showUserController.handle(request, response);
  }
);

usersRoutes.post(
  "/",
  CreateUserValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createUserController.handle(request, response);
  }
);

usersRoutes.put(
  "/:id",
  ensuredAuthentication,
  ensuredSameUser,
  (request, response) => {
    return updateUserController.handle(request, response);
  }
);

usersRoutes.delete(
  "/:id",
  ensuredAuthentication,
  ensuredSameUser,
  (request, response) => {
    return deleteUserController.handle(request, response);
  }
);

usersRoutes.post(
  "/:id/acl",
  ensuredAuthentication,
  is(["admin"]),
  (request, response) => {
    return createUserAccessControlListController.handle(request, response);
  }
);

export { usersRoutes };
