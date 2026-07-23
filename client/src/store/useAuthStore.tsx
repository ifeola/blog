import { create } from "zustand";
import type { UserResponse } from "../types/type";

type AuthStore = {
	user: UserResponse | null;
	accessToken: string | null;
	theme: string;
	setTheme: (theme: string) => void;
	setAuth: (token: string, user: UserResponse) => void;
	clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	accessToken: null,
	theme: localStorage.getItem("theme") || "light",
	setTheme: (theme) => {
		localStorage.setItem("theme", theme);
		set({ theme });
	},
	setAuth: (token, user) => set({ accessToken: token, user }),
	clearAuth: () => set({ accessToken: null, user: null })
}));
