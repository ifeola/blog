import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/types";
import AppError from "../utils/AppError";

const authorize = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new AppError(401, "Authentication falied, please try again."),
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError(403, "Forbidden!"));
    }

    next();
  };
};

export default authorize;
