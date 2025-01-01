import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			// Handle specific error cases
			switch (error.response.status) {
				case 401:
					// Unauthorized - clear token and redirect to login
					localStorage.removeItem("token");
					window.location.href = "/login";
					break;
				case 403:
					// Forbidden
					console.error("Access forbidden");
					break;
				case 404:
					// Not found
					console.error("Resource not found");
					break;
				case 500:
					// Server error
					console.error("Server error");
					break;
				default:
					console.error("API error:", error.response.data);
			}
		}
		return Promise.reject(error);
	}
);

export const authApi = {
	login: (credentials: { email: string; password: string }) =>
		axiosInstance.post("/auth/login", credentials),
	signup: (userData: {
		email: string;
		password: string;
		name: string;
		companyName: string;
	}) => axiosInstance.post("/auth/signup", userData),
	getCurrentUser: () => axiosInstance.get("/auth/me"),
	updatePassword: (credentials: {
		currentPassword: string;
		newPassword: string;
	}) => axiosInstance.put("/auth/update-password", credentials),
};

export const categoriesApi = {
	getAll: () => axiosInstance.get("/categories"),
	getById: (id: string) => axiosInstance.get(`/categories/${id}`),
	create: (data: { name: string; description?: string }) =>
		axiosInstance.post("/categories", data),
	update: (id: string, data: { name: string; description?: string }) =>
		axiosInstance.put(`/categories/${id}`, data),
	delete: (id: string) => axiosInstance.delete(`/categories/${id}`),
};

export const productsApi = {
	getAll: () => axiosInstance.get("/products"),
	getById: (id: string) => axiosInstance.get(`/products/${id}`),
	create: (data: {
		name: string;
		sku: string;
		description?: string;
		price: number;
		categoryId: string;
		threshold?: number;
		quantity: number;
	}) => axiosInstance.post("/products", data),
	update: (
		id: string,
		data: {
			name?: string;
			sku?: string;
			description?: string;
			price?: number;
			categoryId?: string;
			threshold?: number;
			quantity?: number;
		}
	) => axiosInstance.put(`/products/${id}`, data),
	delete: (id: string) => axiosInstance.delete(`/products/${id}`),
};

export const transactionsApi = {
	getAll: () => axiosInstance.get("/transactions"),
	getById: (id: string) => axiosInstance.get(`/transactions/${id}`),
	create: (data: {
		type: "stock-in" | "stock-out";
		productId: string;
		quantity: number;
		price: number;
		date?: string;
	}) => axiosInstance.post("/transactions", data),
	update: (
		id: string,
		data: {
			type?: "stock-in" | "stock-out";
			productId?: string;
			quantity?: number;
			price?: number;
			date?: string;
		}
	) => axiosInstance.put(`/transactions/${id}`, data),
	delete: (id: string) => axiosInstance.delete(`/transactions/${id}`),
};
