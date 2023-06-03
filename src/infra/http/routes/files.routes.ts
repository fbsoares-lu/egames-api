import multer from "multer";
import { Router } from "express";
import { uploadFileController } from "../../../modules/files/useCases/uploadFile";
import { ensuredAuthentication } from "../middlewares/ensuredAuthentication";

const filesRoutes = Router();
const upload = multer({ dest: "tmp", storage: multer.memoryStorage() });

filesRoutes.post(
  "/",
  ensuredAuthentication,
  upload.single("file"),
  (request, response) => {
    return uploadFileController.handle(request, response);
  }
);

export { filesRoutes };
