import { Router } from "express";
import { logout } from "../controllers/auth.controller";
import catchError from "../utils/catchError";

const router = Router();

router.post("/", catchError(logout));

export default router;
