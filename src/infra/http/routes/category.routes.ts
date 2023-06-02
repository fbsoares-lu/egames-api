import { Router, Request, Response } from "express";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";
import { ResponseValidationBase } from "../validations/ResponseValidationBase";
import { is } from "../middlewares/permissions";
import { listCategoryController } from "../../../modules/products/useCases/listCategory";
import { CreateCategoryValidation } from "../validations/products/CreateCategoryValidation";
import { createCategoryController } from "../../../modules/products/useCases/createCategory";
import { updateCategoryController } from "../../../modules/products/useCases/updateCategory";
import { deleteCategoryController } from "../../../modules/products/useCases/deleteCategory";

const categoryRoutes = Router();

categoryRoutes.get(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  (request: Request, response: Response) => {
    return listCategoryController.handle(request, response);
  }
);

categoryRoutes.post(
  "/",
  ensuredAuthentication,
  is(["admin"]),
  CreateCategoryValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return createCategoryController.handle(request, response);
  }
);

categoryRoutes.put(
  "/:id",
  ensuredAuthentication,
  is(["admin"]),
  CreateCategoryValidation.handle(),
  (request: Request, response: Response) => {
    ResponseValidationBase.handle(request, response);
    return updateCategoryController.handle(request, response);
  }
);

categoryRoutes.delete(
  "/:id",
  ensuredAuthentication,
  is(["admin"]),
  (request: Request, response: Response) => {
    return deleteCategoryController.handle(request, response);
  }
);

export { categoryRoutes };
