const API_PATHS = {
	AUTH: {
		LOGIN: "/auth/login",
		LOGOUT: "/auth/logout",
		ME: "/auth/me"
	},

	USER: {
		LIST: "/students",
		CREATE: "/students",
		UPDATE: (id: string) => `/users/${id}`,
		DELETE: (id: string) => `/users/${id}`,
		GET_BY_ID: (id: string) => `/users/${id}`
	}
};

export default API_PATHS;
