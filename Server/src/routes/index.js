import { Router } from "express";
import  healthRouter  from "../routes/health.routes.js";
import authRouter from "./auth.routes.js";
import { userTaskRouter } from "./user.task.routes.js";

const router = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/tasks", userTaskRouter);

export default router;