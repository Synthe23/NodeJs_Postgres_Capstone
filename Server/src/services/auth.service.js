import { appError } from "../errors/appError.js";
import {
  findUserByEmail,
  createUser,
  findUserByEmailWithPassowrd,
} from "../repositories/user.repository.js";
import { accessToken } from "../lib/jwt.js";
import bcrypt from "bcryptjs";

// REGISTER USER
export async function registerUser(email, password) {
  if (!email || !password) {
    throw new appError(400, "Email and password are required!");
  }

  if (typeof email !== "string") {
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

// LOGIN USER
export async function loginUser(email, password) {
  if (!email || !password) {
    throw new appError(
      400,
      "Email and the password are required to login!"
    );
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await findUserByEmailWithPassowrd(normalizedEmail);

  if (!user || !user.password_hash) {
    throw new appError(
      401,
      "Invalid email or the password!"
    );
  }

  const isPassValid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isPassValid) {
    throw new appError(
      401,
      "Invalid email or the password!"
    );
  }

  const token = accessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return token;
}
