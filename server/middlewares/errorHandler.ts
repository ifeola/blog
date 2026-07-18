import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = err instanceof AppError ? err.statusCode : 500;
	const message =
		err instanceof AppError ? err.message : "Internal server error";

	if (process.env.NODE_ENV !== "production") {
		console.log(err);
	}

	res.status(statusCode ?? 500).json({
		success: false,
		message,
		...(process.env.NODE_ENV !== "production" && { stack: err.stack })
	});
};

export default errorHandler;
