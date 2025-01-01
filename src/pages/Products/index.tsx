import React, { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { productsApi } from "../../services/api";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/format";

interface Product {
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

interface ProductDetailsProps {
	product: Product;
	onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
	product,
	onClose,
}) => {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Name
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{product.name}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						SKU
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{product.sku}
					</p>
				</div>
				<div className="col-span-2">
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Description
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{product.description}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Price
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{formatCurrency(product.price)}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Quantity
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{product.quantity} units
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Low Stock Threshold
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{product.lowStockThreshold} units
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Stock Status
					</label>
					<p className="mt-1">
						<span
							className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
								product.quantity <= product.lowStockThreshold
									? "bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-200"
									: "bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-200"
							}`}
						>
							{product.quantity <= product.lowStockThreshold
								? "Low Stock"
								: "In Stock"}
						</span>
					</p>
				</div>
			</div>

			<div className="mt-6 flex justify-end gap-3">
				<Button variant="outline" onClick={onClose}>
					Close
				</Button>
				<Button className="gap-2">
					<Edit className="h-4 w-4" />
					Edit Product
				</Button>
			</div>
		</div>
	);
};

export const Products: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await productsApi.getAll();
				setProducts(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				toast.error("Failed to load products");
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
						Products
					</h1>
					<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
						Manage your inventory products
					</p>
				</div>
				<Button className="gap-2">
					<Plus className="h-4 w-4" />
					Add Product
				</Button>
			</div>

			{isLoading ? (
				<div className="flex justify-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
				</div>
			) : (
				<div className="bg-white dark:bg-neutral-800 shadow-sm rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
							<thead className="bg-neutral-50 dark:bg-neutral-800">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Product
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										SKU
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Price
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Quantity
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
								{products.map((product) => (
									<tr
										key={product.id}
										className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer"
										onClick={() => setSelectedProduct(product)}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
												{product.name}
											</div>
											<div className="text-sm text-neutral-500 dark:text-neutral-400">
												{product.description}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
											{product.sku}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
											{formatCurrency(product.price)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
											{product.quantity} units
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													product.quantity <= product.lowStockThreshold
														? "bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-200"
														: "bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-200"
												}`}
											>
												{product.quantity <= product.lowStockThreshold
													? "Low Stock"
													: "In Stock"}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<Button variant="ghost" size="sm" className="gap-2">
												<Edit className="h-4 w-4" />
												Edit
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			<Modal
				isOpen={!!selectedProduct}
				onClose={() => setSelectedProduct(null)}
				title="Product Details"
			>
				{selectedProduct && (
					<ProductDetails
						product={selectedProduct}
						onClose={() => setSelectedProduct(null)}
					/>
				)}
			</Modal>
		</div>
	);
};
