import type { Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    user_id: "string";
    role: "user" | "admin";
    type: "access";
  };
}

export { AuthenticatedRequest };
