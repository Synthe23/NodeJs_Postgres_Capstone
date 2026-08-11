import { Router } from "express";
import { registerUser } from "../services/auth.service.js";

const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await registerUser(email, password);
    res.status(201).json({
      success: true,
      message: "Please login to continue!",
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
