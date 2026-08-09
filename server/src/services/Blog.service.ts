import type { Pool, PoolClient } from "pg";
import db from "../database/db";

interface PostType {
  authorId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImageUrl: string;
  status: "draft" | "published" | "archived";
}

class Post {
  static async createBlogPost(post: PostType, client: PoolClient | Pool) {
    const queryText = `
      INSERT INTO posts(author_id, title, slug, content, excerpt, cover_image_url, status)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `;

    const params = [
      post.authorId,
      post.title,
      post.slug,
      post.content,
      post.excerpt,
      post.coverImageUrl,
      post.status,
    ];
    const result = await client.query(queryText, params);
    return result.rows[0];
  }

  static async getBlogPost(slug: string) {
    const queryText = `
      SELECT
      posts.id, posts.author_id, posts.title, posts.slug,
      posts.content, posts.excerpt, posts.cover_image_url,
      posts.status, posts.published_at, posts.created_at,
      posts.updated_at, cat.name as category,
      cat.slug as category_slug FROM posts
      JOIN post_categories pc
     	  ON pc.post_id = posts.id
      JOIN categories cat
     	  ON cat.id = pc.category_id
      WHERE posts.slug = $1;
      `;
    const result = await db.query(queryText, [slug]);
    return result.rows[0];
  }

  static async getBlogPosts() {
    const queryText = `
      SELECT * FROM posts;
      `;
    const result = await db.query(queryText);
    return result.rows;
  }
}

export default Post;
