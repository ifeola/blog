import { Router } from "express";
import loginRouter from "./login.routes.ts";
import logoutRouter from "./logout.routes.ts";
import meRouter from "./me.routes.ts";
import registerRouter from "./register.routes.ts";

const router = Router();

// Auth Routers
router.use("/auth/register", registerRouter);
router.use("/auth/login", loginRouter);
router.use("/auth/logout", logoutRouter);
router.use("/auth/me", meRouter);

export default router;
