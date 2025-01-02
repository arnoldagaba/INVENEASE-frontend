import React, { useState, useEffect } from "react";
import { productsApi, transactionsApi } from "../../services";
import { toast } from "react-toastify";
import { formatCurrency } from '../../utils/format';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface AnalyticsData {
	salesByMonth: {
		month: string;
		sales: number;
		transactions: number;
	}[];
	topProducts: {
		name: string;
		sales: number;
		quantity: number;
	}[];
	stockLevels: {
		name: string;
		quantity: number;
		threshold: number;
	}[];
}

interface SalesData {
	name: string;
	sales: number;
	quantity: number;
}

interface StockLevel {
	name: string;
	quantity: number;
	threshold: number;
}

export const Analytics: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<AnalyticsData>({
		salesByMonth: [],
		topProducts: [],
		stockLevels: [],
	});

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const [{ data: products }, { data: transactions }] = await Promise.all([
					productsApi.getAll(),
					transactionsApi.getAll(),
				]);

				// Process sales by month
				const salesByMonth = transactions.reduce(
					(acc: any[], transaction: any) => {
						if (transaction.type === "stock-out") {
							const month = new Date(transaction.date).toLocaleString(
								"default",
								{
									month: "short",
									year: "2-digit",
								}
							);
							const existingMonth = acc.find((item) => item.month === month);
							if (existingMonth) {
								existingMonth.sales += transaction.price * transaction.quantity;
								existingMonth.transactions += 1;
							} else {
								acc.push({
									month,
									sales: transaction.price * transaction.quantity,
									transactions: 1,
								});
							}
						}
						return acc;
					},
					[]
				);

				// Process top products
				const productSales = products.map((product: any) => {
					const sales = transactions
						.filter(
							(t: any) => t.type === "stock-out" && t.productId === product.id
						)
						.reduce((sum: number, t: any) => sum + t.price * t.quantity, 0);
					const quantity = transactions
						.filter(
							(t: any) => t.type === "stock-out" && t.productId === product.id
						)
						.reduce((sum: number, t: any) => sum + t.quantity, 0);
					return {
						name: product.name,
						sales,
						quantity,
					};
				});

				const topProducts = productSales
					.sort((a: SalesData, b: SalesData) => b.sales - a.sales)
					.slice(0, 5);

				// Process stock levels
				const stockLevels = products
					.map((product: any) => ({
						name: product.name,
						quantity: product.quantity,
						threshold: product.lowStockThreshold,
					}))
					.sort((a: StockLevel, b: StockLevel) => a.quantity - b.quantity)
					.slice(0, 10);

				setData({
					salesByMonth,
					topProducts,
					stockLevels,
				});
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
				toast.error("Failed to load analytics data");
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
			</div>
		);
	}

	const salesChartData = {
		labels: data.salesByMonth.map((item) => item.month),
		datasets: [
			{
				label: "Sales ($)",
				data: data.salesByMonth.map((item) => item.sales),
				borderColor: "#6366f1",
				backgroundColor: "rgba(99, 102, 241, 0.1)",
				fill: true,
			},
		],
	};

	const topProductsChartData = {
		labels: data.topProducts.map((item) => item.name),
		datasets: [
			{
				label: "Sales ($)",
				data: data.topProducts.map((item) => item.sales),
				backgroundColor: "#6366f1",
			},
		],
	};

	const stockLevelsChartData = {
		labels: data.stockLevels.map((item) => item.name),
		datasets: [
			{
				label: "Current Stock",
				data: data.stockLevels.map((item) => item.quantity),
				backgroundColor: "#6366f1",
			},
			{
				label: "Low Stock Threshold",
				data: data.stockLevels.map((item) => item.threshold),
				backgroundColor: "#ef4444",
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom" as const,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: "rgba(0, 0, 0, 0.1)",
				},
			},
			x: {
				grid: {
					display: false,
				},
			},
		},
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
					Analytics
				</h1>
				<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
					View your inventory analytics and insights
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Sales Over Time */}
				<div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
					<h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50 mb-4">
						Sales Over Time
					</h2>
					<div className="h-80">
						<Line data={salesChartData} options={chartOptions} />
					</div>
				</div>

				{/* Top Products */}
				<div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
					<h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50 mb-4">
						Top Products by Sales
					</h2>
					<div className="h-80">
						<Bar data={topProductsChartData} options={chartOptions} />
					</div>
				</div>

				{/* Stock Levels */}
				<div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 lg:col-span-2">
					<h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50 mb-4">
						Current Stock Levels
					</h2>
					<div className="h-80">
						<Bar data={stockLevelsChartData} options={chartOptions} />
					</div>
				</div>
			</div>
		</div>
	);
};
