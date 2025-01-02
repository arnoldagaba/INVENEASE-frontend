import api from "./api";

export interface User {
	id: string;
	email: string;
	name: string;
	companyName: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}

export const authService = {
	login: async (email: string, password: string): Promise<AuthResponse> => {
		const response = await api.post<AuthResponse>("/auth/login", {
			email,
			password,
		});
		return response.data;
	},

	signup: async (userData: {
		email: string;
		password: string;
		name: string;
		companyName: string;
	}): Promise<AuthResponse> => {
		const response = await api.post<AuthResponse>("/auth/signup", userData);
		return response.data;
	},

	requestPasswordReset: async (email: string): Promise<void> => {
		await api.post("/auth/request-reset", { email });
	},

	resetPassword: async (token: string, newPassword: string): Promise<void> => {
		await api.post("/auth/reset-password", {
			token,
			newPassword,
		});
	},

	getCurrentUser: async (): Promise<User> => {
		const response = await api.get<User>("/auth/me");
		return response.data;
	},

	updatePassword: async (
		currentPassword: string,
		newPassword: string
	): Promise<void> => {
		await api.put("/auth/update-password", {
			currentPassword,
			newPassword,
		});
	},

	logout: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		window.location.href = "/login";
	},
};
