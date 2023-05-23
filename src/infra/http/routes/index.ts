import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { rolesRoutes } from "./roles.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authenticateRoutes);
router.use("/roles", rolesRoutes);

export { router };
