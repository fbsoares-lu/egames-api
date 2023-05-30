import { Router, Request, Response } from "express";

import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { sendForgotPasswordEmailController } from "../../../modules/accounts/useCases/sendForgotPasswordEmail";
import { ensuredEmailMatchWithUserAccount } from "../middlewares/ensuredEmailMatchWithUserAccount";
import { resetUserPasswordController } from "../../../modules/accounts/useCases/resetUserPassword";

const recoveyRoutes = Router();

recoveyRoutes.post(
  "/",
  ensuredAuthentication,
  ensuredEmailMatchWithUserAccount,
  (request: Request, response: Response) => {
    return sendForgotPasswordEmailController.handle(request, response);
  }
);

recoveyRoutes.post(
  "/password",
  ensuredAuthentication,
  (request: Request, response: Response) => {
    return resetUserPasswordController.handle(request, response);
  }
);

export { recoveyRoutes };
