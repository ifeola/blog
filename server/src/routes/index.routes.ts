import { Router } from "express";
import loginRouter from "./login.routes.ts";
import logoutRouter from "./logout.routes.ts";
import meRouter from "./me.routes.ts";
import createPostRouter from "./post.routes.ts";
import getPostRouter from "./post.routes.ts";
import getPostsRouter from "./post.routes.ts";
import registerRouter from "./register.routes.ts";

const router = Router();

// Auth Routers
router.use("/auth/register", registerRouter);
router.use("/auth/login", loginRouter);
router.use("/auth/logout", logoutRouter);
router.use("/auth/me", meRouter);

// Post router
router.use("/posts", getPostRouter, createPostRouter, getPostsRouter);

export default router;
