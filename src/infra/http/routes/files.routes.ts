import multer from "multer";
import { Router } from "express";
import { uploadFileController } from "../../../modules/files/useCases/uploadFile";

const filesRoutes = Router();
const upload = multer({ dest: "tmp", storage: multer.memoryStorage() });

filesRoutes.post("/", upload.single("file"), (request, response) => {
  return uploadFileController.handle(request, response);
});

export { filesRoutes };
