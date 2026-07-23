import { config } from "dotenv";
import type { Response } from "express";
import { refresh_token } from "./jwt";

config();

const setRefreshCookie = (userId: string, res: Response) => {
	const { token, hash } = refresh_token(userId);

	res.cookie("jwt_refresh", token, {
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
		path: "/api/v1"
	});

	return { token, hash };
};

export default setRefreshCookie;
