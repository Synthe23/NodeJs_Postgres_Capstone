import express from "express";
import { Router } from "express";

const router = Router();

// ROUTES
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "Health route is running 🏃",
    message: "App is running on the PORT 3000 ✅",
  });
});

export default router;
