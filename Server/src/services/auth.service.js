import { appError } from "../errors/appError.js";

export async function registerUser(email, password) {
  if (!email || !password) {
    throw new appError(400, "Either email and the password are required!");
  }

  if(typeof password !== String || password.length < 6){
    throw new appError(400, "Enter a valid password!");
  }
  const normalizeEmail = email.toLowerCase().trim();
}
