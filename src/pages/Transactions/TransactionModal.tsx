import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { productsApi, transactionsApi } from "../../services";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utils/format";

interface TransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
	isOpen,
	onClose,
	onSuccess,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<
		Array<{
			id: string;
			name: string;
			sku: string;
			price: number;
			quantity: number;
		}>
	>([]);
	const [formData, setFormData] = useState({
		type: "stock-in" as "stock-in" | "stock-out",
		productId: "",
		quantity: 1,
		price: 0,
	});

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { data } = await productsApi.getAll();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
				toast.error("Failed to load products");
			}
		};

		if (isOpen) {
			fetchProducts();
		}
	}, [isOpen]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await transactionsApi.create({
				...formData,
				date: new Date().toISOString(),
			});
			toast.success("Transaction created successfully");
			onSuccess();
			onClose();
		} catch (error) {
			console.error("Error creating transaction:", error);
			toast.error("Failed to create transaction");
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: ["quantity", "price"].includes(name) ? Number(value) : value,
		}));

		// Auto-fill price when product is selected
		if (name === "productId") {
			const selectedProduct = products.find((p) => p.id === value);
			if (selectedProduct) {
				setFormData((prev) => ({
					...prev,
					productId: value,
					price: selectedProduct.price,
				}));
			}
		}
	};

	const selectedProduct = products.find(
		(product) => product.id === formData.productId
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="New Transaction">
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label
						htmlFor="type"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						Transaction Type
					</label>
					<select
						id="type"
						name="type"
						value={formData.type}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					>
						<option value="stock-in">Stock In</option>
						<option value="stock-out">Stock Out</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="productId"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						Product
					</label>
					<select
						id="productId"
						name="productId"
						value={formData.productId}
						onChange={handleChange}
						required
						className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					>
						<option value="">Select a product</option>
						{products.map((product) => (
							<option key={product.id} value={product.id}>
								{product.name} (SKU: {product.sku})
							</option>
						))}
					</select>
					{selectedProduct && (
						<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
							Current stock: {selectedProduct.quantity} units
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="quantity"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						Quantity
					</label>
					<input
						type="number"
						id="quantity"
						name="quantity"
						min="1"
						value={formData.quantity}
						onChange={handleChange}
						required
						className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					/>
				</div>

				<div>
					<label
						htmlFor="price"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						Unit Price
					</label>
					<div className="mt-1 relative rounded-md shadow-sm">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<span className="text-neutral-500 dark:text-neutral-400">$</span>
						</div>
						<input
							type="number"
							id="price"
							name="price"
							min="0"
							step="0.01"
							value={formData.price}
							onChange={handleChange}
							required
							className="pl-7 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						/>
					</div>
					{selectedProduct && (
						<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
							Current price: {formatCurrency(selectedProduct.price)}
						</p>
					)}
				</div>

				<div className="flex justify-end space-x-3">
					<Button
						type="button"
						variant="outline"
						onClick={onClose}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Creating..." : "Create Transaction"}
					</Button>
				</div>
			</form>
		</Modal>
	);
};
