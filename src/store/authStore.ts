import { create } from "zustand";
import { User } from "../types";

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (user: User, token: string) => void;
	logout: () => void;
}

// Load initial state from localStorage
const loadInitialState = () => {
	try {
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("token");
		return {
			user: storedUser ? JSON.parse(storedUser) : null,
			token: storedToken || null,
			isAuthenticated: !!storedToken && !!storedUser,
		};
	} catch (error) {
		console.error("Error loading auth state:", error);
		return {
			user: null,
			token: null,
			isAuthenticated: false,
		};
	}
};

export const useAuthStore = create<AuthState>((set) => ({
	...loadInitialState(),
	login: (user: User, token: string) => {
		// Save to localStorage
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);

		set({
			user,
			token,
			isAuthenticated: true,
		});
	},
	logout: () => {
		// Clear localStorage
		localStorage.removeItem("user");
		localStorage.removeItem("token");

		set({
			user: null,
			token: null,
			isAuthenticated: false,
		});
	},
}));
