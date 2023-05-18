import express from "express";
import { AppDataSource } from "./database";
import { router } from "./routes";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(router);

  app.listen(3333, () => {
    console.log("Server is Running...");
  });
});
