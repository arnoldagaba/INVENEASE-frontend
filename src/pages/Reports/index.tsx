import React from "react";
import { Button } from "../../components/ui/Button";
import { FileText, Download } from "lucide-react";
import {
	generateInventoryReport,
	generateSalesReport,
	generateLowStockReport,
} from "../../services/mockData";
import { toast } from "react-toastify";

interface Report {
	id: string;
	name: string;
	description: string;
	type: "CSV" | "PDF" | "Excel";
	generator: () => any[];
	lastGenerated: Date;
}

export const Reports: React.FC = () => {
	const reports: Report[] = [
		{
			id: "1",
			name: "Inventory Report",
			description: "Current inventory levels and values",
			type: "CSV",
			generator: generateInventoryReport,
			lastGenerated: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
		},
		{
			id: "2",
			name: "Sales Report",
			description: "Detailed sales transactions",
			type: "Excel",
			generator: generateSalesReport,
			lastGenerated: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
		},
		{
			id: "3",
			name: "Low Stock Report",
			description: "Products below threshold with reorder quantities",
			type: "CSV",
			generator: generateLowStockReport,
			lastGenerated: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
		},
	];

	const getTimeAgo = (date: Date) => {
		const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
		if (seconds < 60) return "just now";
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;
		return `${Math.floor(hours / 24)}d ago`;
	};

	const downloadReport = (report: Report) => {
		try {
			const data = report.generator();
			const headers = Object.keys(data[0]);

			let csvContent = headers.join(",") + "\n";
			data.forEach((row) => {
				csvContent +=
					headers.map((header) => JSON.stringify(row[header])).join(",") + "\n";
			});

			const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
			const link = document.createElement("a");
			const url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute(
				"download",
				`${report.name.toLowerCase().replace(/\s+/g, "_")}_${
					new Date().toISOString().split("T")[0]
				}.csv`
			);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			toast.success(`${report.name} downloaded successfully`);
		} catch (error) {
			console.error("Error generating report:", error);
			toast.error(`Failed to generate ${report.name}`);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
					Reports
				</h1>
				<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
					Generate and download reports for your business
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{reports.map((report) => (
					<div
						key={report.id}
						className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700"
					>
						<div className="flex items-start justify-between">
							<div className="flex items-center space-x-3">
								<div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
									<FileText className="h-5 w-5 text-primary-600 dark:text-primary-400" />
								</div>
								<div>
									<h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
										{report.name}
									</h3>
									<p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
										{report.description}
									</p>
								</div>
							</div>
						</div>

						<div className="mt-4 flex items-center justify-between">
							<div className="flex items-center space-x-2 text-xs text-neutral-500 dark:text-neutral-400">
								<span>{report.type}</span>
								<span>•</span>
								<span>Last generated {getTimeAgo(report.lastGenerated)}</span>
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="gap-2"
								onClick={() => downloadReport(report)}
							>
								<Download className="h-4 w-4" />
								Download
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
