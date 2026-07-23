import React from "react";
import { createBrowserRouter } from "react-router";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/userPages/Home";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
	{ path: "/login", Component: Login },
	{ path: "/register", Component: Register },
	{
		element: React.createElement(ProtectedRoutes, { allowedRoles: ["user"] }),
		children: [
			{
				Component: LandingPageLayout,
				children: [
					{
						path: "/user/:id",
						Component: Home
					}
				]
			}
		]
	}
]);

export default router;
