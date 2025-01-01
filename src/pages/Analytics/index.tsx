import React from "react";
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
	ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
	products,
	transactions,
	getProductsWithLowStock,
	getTotalInventoryValue,
	getTopSellingProducts,
} from "../../services/mockData";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

export const Analytics: React.FC = () => {
	// Calculate revenue data
	const revenueData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				label: "Revenue",
				data: transactions
					.filter((t) => t.type === "sale")
					.reduce((acc, t) => {
						const month = new Date(t.date).getMonth();
						acc[month] = (acc[month] || 0) + t.price * t.quantity;
						return acc;
					}, Array(6).fill(0)),
				borderColor: "rgb(14, 165, 233)",
				backgroundColor: "rgba(14, 165, 233, 0.1)",
				fill: true,
			},
		],
	};

	// Calculate top products data
	const topProducts = getTopSellingProducts();
	const topProductsData = {
		labels: topProducts.map((p) => p.product.name),
		datasets: [
			{
				label: "Sales",
				data: topProducts.map((p) => p.quantity),
				backgroundColor: [
					"rgba(14, 165, 233, 0.8)",
					"rgba(34, 197, 94, 0.8)",
					"rgba(245, 158, 11, 0.8)",
					"rgba(239, 68, 68, 0.8)",
				],
			},
		],
	};

	// Calculate order status data
	const orderStatusData = {
		labels: ["Completed", "Processing", "Pending", "Cancelled"],
		datasets: [
			{
				data: [63, 25, 10, 2],
				backgroundColor: [
					"rgba(34, 197, 94, 0.8)",
					"rgba(14, 165, 233, 0.8)",
					"rgba(245, 158, 11, 0.8)",
					"rgba(239, 68, 68, 0.8)",
				],
			},
		],
	};

	// Calculate key metrics
	const totalOrders = transactions.filter((t) => t.type === "sale").length;
	const totalRevenue = transactions
		.filter((t) => t.type === "sale")
		.reduce((total, t) => total + t.price * t.quantity, 0);
	const avgOrderValue = totalRevenue / totalOrders;
	const lowStockCount = getProductsWithLowStock().length;

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
					Analytics
				</h1>
				<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
					View your business performance and insights
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Revenue Chart */}
				<div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
					<h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
						Revenue Overview
					</h2>
					<Line
						data={revenueData}
						options={{
							responsive: true,
							plugins: {
								legend: {
									display: false,
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
						}}
					/>
				</div>

				{/* Top Products */}
				<div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
					<h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
						Top Products
					</h2>
					<Bar
						data={topProductsData}
						options={{
							responsive: true,
							plugins: {
								legend: {
									display: false,
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
						}}
					/>
				</div>

				{/* Order Status */}
				<div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
					<h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
						Order Status Distribution
					</h2>
					<div className="flex justify-center">
						<div className="w-64">
							<Doughnut
								data={orderStatusData}
								options={{
									responsive: true,
									plugins: {
										legend: {
											position: "bottom",
										},
									},
								}}
							/>
						</div>
					</div>
				</div>

				{/* Key Metrics */}
				<div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
					<h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
						Key Metrics
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
							<p className="text-sm text-primary-600 dark:text-primary-400">
								Total Orders
							</p>
							<p className="text-2xl font-semibold text-primary-900 dark:text-primary-50">
								{totalOrders}
							</p>
						</div>
						<div className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
							<p className="text-sm text-success-600 dark:text-success-400">
								Total Revenue
							</p>
							<p className="text-2xl font-semibold text-success-900 dark:text-success-50">
								${totalRevenue.toFixed(2)}
							</p>
						</div>
						<div className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
							<p className="text-sm text-warning-600 dark:text-warning-400">
								Avg. Order Value
							</p>
							<p className="text-2xl font-semibold text-warning-900 dark:text-warning-50">
								${avgOrderValue.toFixed(2)}
							</p>
						</div>
						<div className="p-4 bg-error-50 dark:bg-error-900/20 rounded-lg">
							<p className="text-sm text-error-600 dark:text-error-400">
								Low Stock Items
							</p>
							<p className="text-2xl font-semibold text-error-900 dark:text-error-50">
								{lowStockCount}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
