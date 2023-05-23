import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authenticateRoutes);

export { router };
