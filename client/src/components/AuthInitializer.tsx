import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import API_PATHS from "@/utils/apiPaths";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const setAuth = useAuthStore((state) => state.setAuth);

	useEffect(() => {
		const init = async () => {
			try {
				const response = await api.get(API_PATHS.AUTH.ME);
				if (response.data?.access_token && response.data?.user) {
					setAuth(response.data.access_token, response.data.user);
				}
			} catch (error: Error) {
				if (error) {
					console.log(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		};
		init();
	}, [setAuth]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-svh">
				<div className="size-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return children;
};

export default AuthInitializer;
