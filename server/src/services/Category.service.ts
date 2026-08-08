import type { Pool, PoolClient } from "pg";
import db from "../database/db";

type CategoryType = {
  slug: string;
  name: string;
};

class Category {
  static async createCategory(
    category: CategoryType,
    client: PoolClient | Pool,
  ) {
    const queryString = `
        INSERT INTO categories(name, slug) values($1, $2)
        returning *;
      `;
    const params = [category.name, category.slug];

    const response = await client.query(queryString, params);
    return response.rows[0];
  }

  static async createPostCategory(
    postCategoryIds: { postId: string; categoryId: string },
    client: PoolClient | Pool,
  ) {
    const queryString = `
        INSERT INTO post_categories(post_id, category_id) values($1, $2)
        returning *;
      `;
    const params = [postCategoryIds.postId, postCategoryIds.categoryId];

    const response = await client.query(queryString, params);
    return response.rows[0];
  }

  static async getCategory(category: string) {
    const queryString = `
        SELECT * FROM categories
        WHERE categories.name = $1;
      `;

    const response = await db.query(queryString, [category]);
    return response.rows[0];
  }
}

export default Category;
