import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
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
