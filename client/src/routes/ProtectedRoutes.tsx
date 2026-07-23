import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRoutesProps {
	allowedRoles: ("user" | "admin")[];
}

const ProtectedRoutes = ({ allowedRoles }: ProtectedRoutesProps) => {
	const user = useAuthStore((state) => state.user);
	const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

	if (!user) {
		return <Navigate to={"/login"} replace />;
	}

	if (!roles.includes(user.role)) {
		return <Navigate to={"/unauthorized"} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoutes;
