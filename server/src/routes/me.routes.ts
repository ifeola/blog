import { Router } from "express";
import { me } from "../controllers/auth.controller";
import catchError from "../utils/catchError";

const router = Router();

router.get("/", catchError(me));

export default router;
