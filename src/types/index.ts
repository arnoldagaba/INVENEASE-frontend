export interface User {
	id: string;
	name: string;
	email: string;
	role: "admin" | "staff";
}

export interface Category {
	id: string;
	name: string;
	description?: string;
	productCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface Product {
	id: string;
	name: string;
	description?: string;
	sku: string;
	category: Category;
	price: number;
	quantity: number;
	lowStockThreshold: number;
	createdAt: string;
	updatedAt: string;
}

export interface Transaction {
	id: string;
	type: "sale" | "restock";
	productId: string;
	quantity: number;
	price: number;
	date: string;
}
