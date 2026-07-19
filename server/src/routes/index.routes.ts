import { Router } from "express";
import loginRouter from "./login.routes.ts";
import registerRouter from "./register.routes.ts";

const router = Router();

router.use("/auth/register", registerRouter);
router.use("/auth/login", loginRouter);

export default router;
