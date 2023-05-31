import { Router, Request, Response } from "express";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { is } from "../middlewares/permissions";
import { CreatePaymentValidation } from "../validations/accounts/CreatePaymentValidation";
import { createPaymentOptionController } from "../../../modules/products/useCases/createPaymentOption";
import { updatePaymentOptionController } from "../../../modules/products/useCases/updatePaymentOption";
import { deletePaymentOptionController } from "../../../modules/products/useCases/deletePaymentOption";
import { listPaymentOptionController } from "../../../modules/products/useCases/listPaymentOption";

const paymentRoutes = Router();

paymentRoutes.get(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  (request: Request, response: Response) => {
    return listPaymentOptionController.handle(request, response);
  }
);

paymentRoutes.post(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  CreatePaymentValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createPaymentOptionController.handle(request, response);
  }
);

paymentRoutes.put(
  "/:id",
  ensuredAuthentication,
  is(["admin"]),
  CreatePaymentValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return updatePaymentOptionController.handle(request, response);
  }
);

paymentRoutes.delete(
  "/:id",
  ensuredAuthentication,
  is(["admin"]),
  (request: Request, response: Response) => {
    return deletePaymentOptionController.handle(request, response);
  }
);

export { paymentRoutes };
