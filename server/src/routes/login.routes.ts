import { Router } from "express";
import { login } from "../controllers/auth.controller";
import catchError from "../utils/catchError";

const router = Router();

router.post("/", catchError(login));

export default router;
