import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import cors from "cors";
import router from "./routes/index.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api", router);

  app.use(errorHandler);
  app.use(notFound);

  return app;
}