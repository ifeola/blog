import { Router } from "express";
import { register } from "../controllers/auth.controller";
import catchError from "../utils/catchError";

const router = Router();

router.post("/", catchError(register));

export default router;
