import { Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthenticatedRequest } from "../types/types";

dotenv.config();

const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  let token: string;

  if (
    req.headers?.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1] as string;
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt as string;
  }

  if (!token) {
    return next(new AppError(401, "Authentication falied, please try again."));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as {
      user_id: "string";
      role: "user" | "admin";
      type: "access";
    };

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
