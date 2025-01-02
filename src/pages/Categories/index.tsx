import React, { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { categoriesApi, productsApi } from "../../services";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CategoryModal } from "./CategoryModal";

interface Category {
	id: string;
	name: string;
	description: string;
	productCount: number;
	createdAt: string;
	updatedAt: string;
}

interface Product {
	id: string;
	name: string;
	category: string;
}

interface CategoryDetailsProps {
	category: Category;
	onClose: () => void;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({
	category,
	onClose,
}) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { data } = await productsApi.getAll();
				const categoryProducts = data.filter(
					(product: Product) => product.category === category.id
				);
				setProducts(categoryProducts);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				toast.error("Failed to load products");
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, [category.id]);

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Name
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{category.name}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Product Count
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{category.productCount} products
					</p>
				</div>
				<div className="col-span-2">
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Description
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{category.description}
					</p>
				</div>
			</div>

			<div className="mt-6">
				<h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-50 mb-3">
					Products in this category
				</h4>
				{isLoading ? (
					<div className="flex justify-center">
						<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
					</div>
				) : (
					<ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
						{products.map((product) => (
							<li key={product.id} className="py-3">
								<span className="text-sm text-neutral-900 dark:text-neutral-50">
									{product.name}
								</span>
							</li>
						))}
						{products.length === 0 && (
							<li className="py-3 text-sm text-neutral-500 dark:text-neutral-400">
								No products in this category
							</li>
						)}
					</ul>
				)}
			</div>

			<div className="mt-6 flex justify-end">
				<Button variant="outline" onClick={onClose}>
					Close
				</Button>
			</div>
		</div>
	);
};

export const Categories: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	);
	const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);

	const fetchCategories = async () => {
		try {
			const { data } = await categoriesApi.getAll();
			setCategories(data);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching categories:", error);
			toast.error("Failed to load categories");
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
						Categories
					</h1>
					<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
						Manage your product categories
					</p>
				</div>
				<Button
					className="gap-2"
					onClick={() => setIsNewCategoryModalOpen(true)}
				>
					<Plus className="h-4 w-4" />
					Add Category
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
										Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Description
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Products
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Created
									</th>
									<th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
								{categories.map((category) => (
									<tr
										key={category.id}
										className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer"
										onClick={() => setSelectedCategory(category)}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
												{category.name}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-neutral-500 dark:text-neutral-400">
												{category.description}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-200">
												{category.productCount} products
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
											{format(new Date(category.createdAt), "MMM d, yyyy")}
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

			<CategoryModal
				isOpen={isNewCategoryModalOpen}
				onClose={() => setIsNewCategoryModalOpen(false)}
				onSuccess={() => {
					fetchCategories();
					setIsNewCategoryModalOpen(false);
				}}
			/>

			<CategoryModal
				isOpen={!!editingCategory}
				onClose={() => setEditingCategory(null)}
				onSuccess={() => {
					fetchCategories();
					setEditingCategory(null);
				}}
				category={editingCategory || undefined}
			/>

			<Modal
				isOpen={!!selectedCategory}
				onClose={() => setSelectedCategory(null)}
				title="Category Details"
			>
				{selectedCategory && (
					<CategoryDetails
						category={selectedCategory}
						onClose={() => setSelectedCategory(null)}
					/>
				)}
			</Modal>
		</div>
	);
};
