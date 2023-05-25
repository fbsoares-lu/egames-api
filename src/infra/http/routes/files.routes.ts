import multer from "multer";
import { Router } from "express";

import { createFileController } from "../../../modules/files/useCases/CreateFile";
const filesRoutes = Router();
const upload = multer({ dest: "./tmp" });

filesRoutes.post("/", upload.single("file"), (request, response) => {
  return createFileController.handle(request, response);
});

export { filesRoutes };
