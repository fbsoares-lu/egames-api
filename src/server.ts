import express from "express";
import cors from "cors";

import { AppDataSource } from "./database";
import { router } from "./routes";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(router);
  app.use(cors());

  app.listen(3333, () => {
    console.log("Server is Running...");
  });
});
