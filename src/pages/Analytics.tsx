import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { DateRangePicker } from "../components/ui/DateRangePicker";

interface AnalyticsData {
	timestamp: string;
	value: number;
	category: string;
}

interface AnalyticsSummary {
	total: number;
	average: number;
	min: number;
	max: number;
	trend: "up" | "down" | "stable";
	percentageChange: number;
}

export const Analytics = () => {
	const [timeRange, setTimeRange] = useState<[Date, Date]>([
		new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
		new Date(),
	]);
	const [metric, setMetric] = useState<string>("inventory");
	const [interval, setInterval] = useState<string>("daily");
	const [data, setData] = useState<AnalyticsData[]>([]);
	const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch analytics data
	const fetchAnalytics = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`/api/analytics?metric=${metric}&interval=${interval}&start=${timeRange[0].toISOString()}&end=${timeRange[1].toISOString()}`
			);
			if (!response.ok) throw new Error("Failed to fetch analytics data");
			const result = await response.json();
			setData(result.data);
			setSummary(result.summary);
		} catch (error) {
			console.error("Error fetching analytics:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Subscribe to real-time updates
	useEffect(() => {
		const ws = new WebSocket(
			`${import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws"}/analytics`
		);

		ws.onmessage = (event) => {
			const update = JSON.parse(event.data);
			setData((prevData) => [...prevData, update]);
			// Recalculate summary
			calculateSummary([...data, update]);
		};

		return () => ws.close();
	}, [data]);

	// Calculate summary statistics
	const calculateSummary = (dataPoints: AnalyticsData[]) => {
		if (!dataPoints.length) return;

		const values = dataPoints.map((d) => d.value);
		const total = values.reduce((a, b) => a + b, 0);
		const average = total / values.length;
		const min = Math.min(...values);
		const max = Math.max(...values);

		// Calculate trend
		const recentValues = dataPoints.slice(-2).map((d) => d.value);
		const percentageChange =
			((recentValues[1] - recentValues[0]) / recentValues[0]) * 100;
		const trend =
			percentageChange > 1 ? "up" : percentageChange < -1 ? "down" : "stable";

		setSummary({
			total,
			average,
			min,
			max,
			trend,
			percentageChange,
		});
	};

	// Fetch data when parameters change
	useEffect(() => {
		fetchAnalytics();
	}, [timeRange, metric, interval]);

	return (
		<div className="p-6 space-y-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col gap-6"
			>
				{/* Controls */}
				<div className="flex flex-wrap gap-4">
					<Select
						value={metric}
						onChange={(e) => setMetric(e.target.value)}
						className="w-48"
					>
						<option value="inventory">Inventory Levels</option>
						<option value="sales">Sales</option>
						<option value="revenue">Revenue</option>
						<option value="costs">Costs</option>
					</Select>

					<Select
						value={interval}
						onChange={(e) => setInterval(e.target.value)}
						className="w-48"
					>
						<option value="hourly">Hourly</option>
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
					</Select>

					<DateRangePicker
						value={timeRange}
						onChange={setTimeRange}
						className="w-72"
					/>

					<Button
						onClick={fetchAnalytics}
						isLoading={isLoading}
						className="ml-auto"
					>
						Refresh
					</Button>
				</div>

				{/* Summary Cards */}
				{summary && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<Card className="p-4">
							<h3 className="text-lg font-medium mb-2">Total</h3>
							<p className="text-2xl font-semibold">
								{summary.total.toFixed(2)}
							</p>
						</Card>
						<Card className="p-4">
							<h3 className="text-lg font-medium mb-2">Average</h3>
							<p className="text-2xl font-semibold">
								{summary.average.toFixed(2)}
							</p>
						</Card>
						<Card className="p-4">
							<h3 className="text-lg font-medium mb-2">Range</h3>
							<p className="text-2xl font-semibold">
								{summary.min.toFixed(2)} - {summary.max.toFixed(2)}
							</p>
						</Card>
						<Card className="p-4">
							<h3 className="text-lg font-medium mb-2">Trend</h3>
							<div className="flex items-center gap-2">
								<span
									className={`text-2xl font-semibold ${
										summary.trend === "up"
											? "text-success-500"
											: summary.trend === "down"
											? "text-error-500"
											: "text-neutral-500"
									}`}
								>
									{summary.percentageChange.toFixed(2)}%
								</span>
							</div>
						</Card>
					</div>
				)}

				{/* Charts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Line Chart */}
					<Card className="p-4">
						<h3 className="text-lg font-medium mb-4">Trend Analysis</h3>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={data}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="timestamp" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line
										type="monotone"
										dataKey="value"
										stroke="#0ea5e9"
										strokeWidth={2}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</Card>

					{/* Bar Chart */}
					<Card className="p-4">
						<h3 className="text-lg font-medium mb-4">Distribution Analysis</h3>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={data}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="timestamp" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar dataKey="value" fill="#0ea5e9" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</Card>
				</div>
			</motion.div>
		</div>
	);
};
