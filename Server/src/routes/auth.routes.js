import { Router } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

// REGISTER
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

// LOGIN
authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await loginUser(email, password);

    res.status(200).json({
      success: true,
      data: {
        accessToken: token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET the CURRENT user
authRouter.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

export default authRouter;
