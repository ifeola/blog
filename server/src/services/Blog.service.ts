import type { Pool, PoolClient } from "pg";
import db from "../database/db";

interface PostType {
  authorId: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published" | "archived";
}

class Post {
  static async createBlogPost(post: PostType, client: PoolClient | Pool) {
    const queryText = `
      INSERT INTO posts(author_id, title, slug, content, status)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *;
      `;

    const params = [
      post.authorId,
      post.title,
      post.slug,
      post.content,
      post.status,
    ];
    const result = await client.query(queryText, params);
    return result.rows[0];
  }

  static async getBlogPost(id: string) {
    const queryText = `
      SELECT * FROM posts
      WHERE id = $1;
      `;
    const params = [id];
    const result = await db.query(queryText, params);
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
