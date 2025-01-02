import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../services/auth";

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (user: User, token: string) => void;
	logout: () => void;
	updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			login: (user: User, token: string) => {
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(user));
				set({ user, token, isAuthenticated: true });
			},
			logout: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				set({ user: null, token: null, isAuthenticated: false });
			},
			updateUser: (user: User) => {
				localStorage.setItem("user", JSON.stringify(user));
				set({ user });
			},
		}),
		{
			name: "auth-storage",
		}
	)
);
