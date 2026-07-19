import { config } from "dotenv";
import { Pool } from "pg";

config();

const sql = new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: parseInt(process.env.DB_PORT as string, 10),
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});

export default {
	query: (text: string, params: (string | number | null | Date | boolean)[]) =>
		sql.query(text, params),
	sql
};
