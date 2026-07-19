import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, {
	type Application,
	type NextFunction,
	type Request,
	type Response,
	urlencoded
} from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.ts";
import router from "./routes/index.routes.ts";

config();

const createApp = () => {
	const app = express();

	app.use(
		cors({
			origin: process.env.CLIENT_ORIGIN,
			credentials: true
		})
	);
	app.use(express.json());
	app.use(urlencoded({ extended: true }));
	app.use(cookieParser());

	if (process.env.NODE_ENV !== "development") {
		app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
	}

	app.use("/api/v1", router);
	// app.use(notFound);
	app.use(errorHandler);
	return app;
};

export default createApp;
