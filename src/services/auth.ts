import { authApi } from "./api";

interface LoginCredentials {
	email: string;
	password: string;
}

interface SignupCredentials extends LoginCredentials {
	name: string;
	companyName: string;
}

interface UpdatePasswordCredentials {
	currentPassword: string;
	newPassword: string;
}

export const authService = {
	login: (credentials: LoginCredentials) => authApi.login(credentials),
	signup: (credentials: SignupCredentials) => authApi.signup(credentials),
	getCurrentUser: () => authApi.getCurrentUser(),
	updatePassword: (credentials: UpdatePasswordCredentials) =>
		authApi.updatePassword(credentials),
};
