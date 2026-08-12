import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function accessToken(payload) {
  const options = {
    expiresIn: env.jwtAccessExpiresIn,
  };

  return jwt.sign(payload, env.jwtAccessSecret, options);
}
