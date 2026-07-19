import crypto from "crypto";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const access_token = (userId: string, user_role: "admin" | "user"): string => {
	const token = jwt.sign(
		{ user_id: userId, role: user_role, type: "access" },
		process.env.ACCESS_TOKEN_SECRET as string,
		{
			expiresIn: "1d"
		}
	);

	return token;
};

const refresh_token = (userId: string) => {
	const token = jwt.sign(
		{ user_id: userId, type: "refresh" },
		process.env.REFRESH_TOKEN_SECRET as string,
		{
			expiresIn: "7d"
		}
	);

	const hash = crypto.createHash("sha256").update(token).digest("hex");

	return { token, hash };
};

export { access_token, refresh_token };
