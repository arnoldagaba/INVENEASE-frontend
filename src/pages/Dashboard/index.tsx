import React, { useState, useEffect } from "react";
import {
	ArrowUpRight,
	ArrowDownRight,
	Package,
	Tags,
	AlertTriangle,
} from "lucide-react";
import {
	productsApi,
	categoriesApi,
	transactionsApi,
} from "../../services/api";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utils/format";

interface DashboardStats {
	totalProducts: number;
	totalCategories: number;
	totalSales: number;
	lowStockProducts: number;
}

export const Dashboard: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState<DashboardStats>({
		totalProducts: 0,
		totalCategories: 0,
		totalSales: 0,
		lowStockProducts: 0,
	});

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				const [products, categories, transactions] = await Promise.all([
					productsApi.getAll(),
					categoriesApi.getAll(),
					transactionsApi.getAll(),
				]);

				const lowStockCount = products.data.filter(
					(product: any) => product.quantity <= product.lowStockThreshold
				).length;

				const totalSales = transactions.data
					.filter((t: any) => t.type === "sale")
					.reduce((sum: number, t: any) => sum + t.price * t.quantity, 0);

				setStats({
					totalProducts: products.data.length,
					totalCategories: categories.data.length,
					totalSales,
					lowStockProducts: lowStockCount,
				});
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
				toast.error("Failed to load dashboard data");
				setIsLoading(false);
			}
		};

		fetchDashboardData();
	}, []);

	const stats_items = [
		{
			name: "Total Products",
			value: stats.totalProducts,
			icon: Package,
			change: "+4.75%",
			changeType: "positive",
		},
		{
			name: "Total Categories",
			value: stats.totalCategories,
			icon: Tags,
			change: "+54.02%",
			changeType: "positive",
		},
		{
			name: "Total Sales",
			value: formatCurrency(stats.totalSales),
			icon: ArrowUpRight,
			change: "+12.05%",
			changeType: "positive",
		},
		{
			name: "Low Stock Products",
			value: stats.lowStockProducts,
			icon: AlertTriangle,
			change: "-8.35%",
			changeType: "negative",
		},
	];

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
					Dashboard
				</h1>
				<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
					Overview of your inventory system
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{stats_items.map((item) => (
					<div
						key={item.name}
						className="bg-white dark:bg-neutral-800 shadow-sm rounded-lg p-6 border border-neutral-200 dark:border-neutral-700"
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="p-2 bg-primary-50 dark:bg-primary-900/50 rounded-lg">
									<item.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
								</div>
							</div>
							<div
								className={`flex items-center text-sm font-medium ${
									item.changeType === "positive"
										? "text-success-600 dark:text-success-400"
										: "text-error-600 dark:text-error-400"
								}`}
							>
								{item.change}
								{item.changeType === "positive" ? (
									<ArrowUpRight className="h-4 w-4 ml-1" />
								) : (
									<ArrowDownRight className="h-4 w-4 ml-1" />
								)}
							</div>
						</div>
						<div className="mt-4">
							<h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
								{item.name}
							</h3>
							<p className="mt-2 text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
								{item.value}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
