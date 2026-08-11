import { appError } from "../errors/appError.js";
import {
  findUserByEmail,
  createUser,
} from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";


// REGISTER USER
export async function registerUser(email, password) {
  if (!email || !password) {
    throw new appError(400, "Email and password are required!");
  }

  if(typeof email !== "string"){
    throw new appError(400, "Enter a valid email!");
  }

  if (typeof password !== "string" || password.length < 6) {
    throw new appError(400, "Password must be at least 6 characters long!");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new appError(409, "Email already registered!");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await createUser(normalizedEmail, passwordHash);
}
