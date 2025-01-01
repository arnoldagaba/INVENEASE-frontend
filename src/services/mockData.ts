export interface Product {
	id: string;
	name: string;
	description: string;
	sku: string;
	category: string;
	price: number;
	quantity: number;
	lowStockThreshold: number;
	createdAt: string;
	updatedAt: string;
}

export interface Category {
	id: string;
	name: string;
	description: string;
	productCount: number;
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

// Mock Categories
export const categories: Category[] = [
	{
		id: "1",
		name: "Electronics",
		description: "Electronic devices and accessories",
		productCount: 3,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "2",
		name: "Office Supplies",
		description: "General office supplies and stationery",
		productCount: 2,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "3",
		name: "Furniture",
		description: "Office furniture and accessories",
		productCount: 1,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
];

// Mock Products
export const products: Product[] = [
	{
		id: "1",
		name: "Laptop Pro X",
		description: "High-performance laptop for professionals",
		sku: "LAP-PRO-001",
		category: "1", // Electronics
		price: 4500000, // UGX
		quantity: 15,
		lowStockThreshold: 5,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "2",
		name: "Wireless Mouse",
		description: "Ergonomic wireless mouse",
		sku: "MOU-WIR-001",
		category: "1", // Electronics
		price: 85000, // UGX
		quantity: 50,
		lowStockThreshold: 10,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "3",
		name: "Premium Paper",
		description: "High-quality printing paper",
		sku: "PAP-PRE-001",
		category: "2", // Office Supplies
		price: 35000, // UGX
		quantity: 100,
		lowStockThreshold: 20,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "4",
		name: "Office Chair",
		description: "Ergonomic office chair",
		sku: "CHA-ERG-001",
		category: "3", // Furniture
		price: 750000, // UGX
		quantity: 8,
		lowStockThreshold: 3,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "5",
		name: "Mechanical Keyboard",
		description: "Professional mechanical keyboard",
		sku: "KEY-MEC-001",
		category: "1", // Electronics
		price: 250000, // UGX
		quantity: 4,
		lowStockThreshold: 5,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "6",
		name: "Sticky Notes",
		description: "Colorful sticky notes pack",
		sku: "NOT-STK-001",
		category: "2", // Office Supplies
		price: 15000, // UGX
		quantity: 150,
		lowStockThreshold: 30,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
];

// Mock Transactions (last 30 days)
export const transactions: Transaction[] = [
	{
		id: "1",
		type: "sale",
		productId: "1",
		quantity: 2,
		price: 1299.99,
		date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
	},
	{
		id: "2",
		type: "sale",
		productId: "2",
		quantity: 5,
		price: 29.99,
		date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
	},
	{
		id: "3",
		type: "restock",
		productId: "5",
		quantity: 10,
		price: 89.99,
		date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
	},
	{
		id: "4",
		type: "sale",
		productId: "4",
		quantity: 1,
		price: 199.99,
		date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
	},
];

// Helper functions
export const getCategoryById = (id: string) =>
	categories.find((c) => c.id === id);
export const getProductById = (id: string) => products.find((p) => p.id === id);

// Analytics helpers
export const getProductsWithLowStock = () =>
	products.filter((p) => p.quantity <= p.lowStockThreshold);
export const getTotalInventoryValue = () =>
	products.reduce((total, p) => total + p.price * p.quantity, 0);
export const getTopSellingProducts = () => {
	const sales = transactions
		.filter((t) => t.type === "sale")
		.reduce((acc, t) => {
			acc[t.productId] = (acc[t.productId] || 0) + t.quantity;
			return acc;
		}, {} as Record<string, number>);

	return Object.entries(sales)
		.map(([productId, quantity]) => ({
			product: getProductById(productId)!,
			quantity,
		}))
		.sort((a, b) => b.quantity - a.quantity);
};

// Report generation helpers
export const generateInventoryReport = () => {
	const rows = products.map((p) => ({
		SKU: p.sku,
		Name: p.name,
		Category: getCategoryById(p.category)?.name,
		"In Stock": p.quantity,
		"Low Stock Threshold": p.lowStockThreshold,
		Price: p.price.toFixed(2),
		Value: (p.price * p.quantity).toFixed(2),
	}));

	return rows;
};

export const generateSalesReport = () => {
	const sales = transactions
		.filter((t) => t.type === "sale")
		.map((t) => {
			const product = getProductById(t.productId)!;
			return {
				Date: new Date(t.date).toLocaleDateString(),
				Product: product.name,
				SKU: product.sku,
				Quantity: t.quantity,
				"Unit Price": t.price.toFixed(2),
				Total: (t.quantity * t.price).toFixed(2),
			};
		});

	return sales;
};

export const generateLowStockReport = () => {
	const lowStock = getProductsWithLowStock().map((p) => ({
		SKU: p.sku,
		Name: p.name,
		Category: getCategoryById(p.category)?.name,
		"Current Stock": p.quantity,
		"Low Stock Threshold": p.lowStockThreshold,
		"Reorder Quantity": p.lowStockThreshold * 2 - p.quantity,
	}));

	return lowStock;
};

// Helper function to format currency in UGX
export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("en-UG", {
		style: "currency",
		currency: "UGX",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};
