import db from "../database/db.ts";
import type { UserSchema } from "../middlewares/validator.ts";

class User {
	static async create(data: UserSchema) {
		const queryText = `
    INSERT INTO USERS(first_name, middle_name, last_name, date_of_birth, email, password_hash)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;

		const params = [
			data.first_name,
			data.middle_name ?? null,
			data.last_name,
			data.date_of_birth,
			data.email,
			data.password
		];

		const result = await db.query(queryText, params);
		return result;
	}

	static async findByEmail(email: string) {
		const queryText = `
    SELECT email, first_name, last_name, middle_name, password_hash, date_of_birth, id, role 
    FROM users
    WHERE users.email = $1;
    `;

		const result = await db.query(queryText, [email]);
		return result.rows[0];
	}

	static async findById(id: string) {
		const queryText = `
    SELECT email, first_name, last_name, middle_name, password_hash, date_of_birth, id, role 
    FROM users
    WHERE users.id = $1;
    `;

		const result = await db.query(queryText, [id]);
		return result.rows[0];
	}
}

export default User;
