import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../database/db";
import { loginSchema, userSchema } from "../middlewares/validator";
import User from "../services/User.service";
import AppError from "../utils/AppError";
import setRefreshCookie from "../utils/cookie";
import { access_token } from "../utils/jwt";

const register = async (req: Request, res: Response, next: NextFunction) => {
	const data = { ...req.body, date_of_birth: new Date(req.body.date_of_birth) };
	console.log(data);
	const parsed = userSchema.safeParse(data);

	if (!parsed.success) {
		return next(
			new AppError(400, parsed.error?.issues[0]?.message ?? "Validation error")
		);
	}

	const userData = parsed.data;

	const existing = await db.query(
		`
      SELECT id FROM users
      WHERE users.email = $1;
    `,
		[userData.email]
	);

	if (existing.rows.length > 0) {
		return res.status(409).json({
			success: false,
			message: "Email or phone already registered"
		});
	}

	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(userData.password, salt);

	const result = await User.create({
		...userData,
		password: passwordHash
	});
	return res.status(201).json({
		success: true,
		message: "User successfully created",
		user: {
			...result.rows[0],
			password_hash: undefined
		}
	});
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	const parsed = loginSchema.safeParse(req.body);

	if (!parsed.success) {
		return next(
			new AppError(400, parsed.error?.issues[0]?.message ?? "Validation error")
		);
	}

	const user = parsed.data;
	const existingUser = await User.findByEmail(user.email);

	if (!existingUser) {
		return res.status(404).json({ success: false, message: "User not found" });
	}

	const compare = await bcrypt.compare(
		user.password,
		existingUser.password_hash
	);

	if (!compare) {
		return res
			.status(400)
			.json({ success: false, message: "Incorrect email or password" });
	}

	const { token: refreshToken, hash } = setRefreshCookie(existingUser.id, res);
	const accessToken = access_token(existingUser.id, existingUser.user_role);

	let decoded: { user_id: string; type: string; exp: number };
	try {
		decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
			user_id: string;
			type: string;
			exp: number;
		};

		await db.query(
			`INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
			[existingUser.id, hash, new Date(decoded.exp * 1000)]
		);
	} catch (err) {
		return next(err);
	}

	return res.status(201).json({
		success: true,
		message: "User successfully logged in",
		user: {
			...existingUser,
			password_hash: undefined,
			access_token: accessToken
		}
	});
};

export { login, register };
