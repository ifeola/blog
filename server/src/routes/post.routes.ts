import { Router } from "express";
import catchError from "../utils/catchError";
import {
  createBlogPost,
  getBlogPost,
  getBlogPosts,
} from "../controllers/post.controller";
import authenticate from "../middlewares/authenticate";
import authorize from "../middlewares/authorize";

const router = Router();

router
  .post(
    "/",
    authenticate,
    authorize(["admin", "user"]),
    catchError(createBlogPost),
  )
  .get("/:slug", authenticate, catchError(getBlogPost))
  .get("/", authenticate, catchError(getBlogPosts));

export default router;
