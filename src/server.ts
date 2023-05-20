import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import { AppDataSource } from "./database";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(router);
  app.use(cors());

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }

      return response.status(500).json({
        status: "error",
        message: `Internal Server Error - ${err.message}`,
      });
    }
  );

  app.listen(3333, () => {
    console.log("Server is Running...");
  });
});
