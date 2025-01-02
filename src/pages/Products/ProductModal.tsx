import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { productsApi, categoriesApi } from "../../services";
import { toast } from "react-toastify";

interface ProductModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
	product?: {
		id: string;
		name: string;
		sku: string;
		description: string;
		price: number;
		categoryId: string;
		quantity: number;
		lowStockThreshold: number;
	};
}

export const ProductModal: React.FC<ProductModalProps> = ({
	isOpen,
	onClose,
	onSuccess,
	product,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState<
		Array<{ id: string; name: string }>
	>([]);
	const [formData, setFormData] = useState({
		name: product?.name || "",
		sku: product?.sku || "",
		description: product?.description || "",
		price: product?.price || 0,
		categoryId: product?.categoryId || "",
		quantity: product?.quantity || 0,
		lowStockThreshold: product?.lowStockThreshold || 5,
	});

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const { data } = await categoriesApi.getAll();
				setCategories(data);
			} catch (error) {
				console.error("Error fetching categories:", error);
				toast.error("Failed to load categories");
			}
		};

		if (isOpen) {
			fetchCategories();
		}
	}, [isOpen]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (product) {
				await productsApi.update(product.id, formData);
				toast.success("Product updated successfully");
			} else {
				await productsApi.create(formData);
				toast.success("Product created successfully");
			}
			onSuccess();
			onClose();
		} catch (error) {
			console.error("Error saving product:", error);
			toast.error(
				product ? "Failed to update product" : "Failed to create product"
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: ["price", "quantity", "lowStockThreshold"].includes(name)
				? Number(value)
				: value,
		}));
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={product ? "Edit Product" : "New Product"}
		>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					/>
				</div>

				<div>
					<label
						htmlFor="sku"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						SKU
					</label>
					<input
						type="text"
						id="sku"
						name="sku"
						value={formData.sku}
						onChange={handleChange}
						required
						className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					/>
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						Description
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						rows={3}
						className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					/>
				</div>

				<div>
					<label
						htmlFor="categoryId"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						Category
					</label>
					<select
						id="categoryId"
						name="categoryId"
						value={formData.categoryId}
						onChange={handleChange}
						required
						className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="price"
							className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
						>
							Price
						</label>
						<div className="mt-1 relative rounded-md shadow-sm">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span className="text-neutral-500 dark:text-neutral-400">
									$
								</span>
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
							min="0"
							value={formData.quantity}
							onChange={handleChange}
							required
							className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="lowStockThreshold"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						Low Stock Threshold
					</label>
					<input
						type="number"
						id="lowStockThreshold"
						name="lowStockThreshold"
						min="0"
						value={formData.lowStockThreshold}
						onChange={handleChange}
						required
						className="mt-1 block w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-primary-500"
					/>
					<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
						Alert will be shown when stock falls below this number
					</p>
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
						{isLoading ? "Saving..." : product ? "Update" : "Create"}
					</Button>
				</div>
			</form>
		</Modal>
	);
};
