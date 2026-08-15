import express from "express";
import { Router } from "express";
import authRouter from "./auth.routes.js";

const healthRouter = Router();

// ROUTES
healthRouter.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "Health route is running 🏃",
    message: "App is running on the PORT 3000 ✅",
  });
});

healthRouter.use('/auth', authRouter);

export default healthRouter;