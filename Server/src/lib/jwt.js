import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { appError } from "../errors/appError.js";

// Create a Access token
export function accessToken(payload) {
  const options = {
    expiresIn: env.jwtAccessExpiresIn,
  };

  return jwt.sign(payload, env.jwtAccessSecret, options);
}

// Verify the Access Token
export function verifyAccessToken(token){
    try {
        return jwt.verify(token, env.jwtAccessSecret);
    } catch (error) {
        throw new appError(401, "Invalid/expired access token!");
    }
}
