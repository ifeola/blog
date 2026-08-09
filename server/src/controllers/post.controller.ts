import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { AuthenticatedRequest } from "../types/types";
import db from "../database/db";
import Post from "../services/Blog.service";
import Category from "../services/Category.service";

const slug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]+/g, "-")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
};

const createBlogPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.user_id;
  const { title, categoryName, content, excerpt, coverImageUrl, status } =
    req.body;

  const titleSlug = slug(title);
  const categorySlug = slug(categoryName);

  const isCategoryExisting = await Category.getCategory(categoryName);

  const client = await db.sql.connect();
  try {
    await client.query("BEGIN");
    let categoryResponse;
    if (!isCategoryExisting) {
      const category = { slug: categorySlug, name: categoryName };
      categoryResponse = await Category.createCategory(category, client);
    } else {
      categoryResponse = isCategoryExisting;
    }
    const categoryId = categoryResponse.id as string;

    const post = {
      authorId: userId,
      title,
      slug: titleSlug,
      content,
      excerpt,
      coverImageUrl,
      status,
    } as {
      authorId: string;
      title: string;
      slug: string;
      content: string;
      excerpt: string;
      coverImageUrl: string;
      status: "draft" | "published" | "archived";
    };
    const postResponse = await Post.createBlogPost(post, client);
    const postId = postResponse.id as string;

    const postCategory = await Category.createPostCategory(
      { postId, categoryId },
      client,
    );

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      post: postResponse,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    if (error instanceof Error) {
      return next(error);
    }
    return next(new Error("Something went wrong"));
  } finally {
    client.release();
  }
};

const getBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  const postSlug = req.params.slug as string;
  const post = await Post.getBlogPost(postSlug);
  return res.status(200).json({
    success: true,
    message: "Blog post retrieved successfully",
    post,
  });
};

const getBlogPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const posts = await Post.getBlogPosts();
  return res.status(200).json({
    success: true,
    message: "Blog posts retrieved successfully",
    posts,
  });
};

export { createBlogPost, getBlogPost, getBlogPosts };
