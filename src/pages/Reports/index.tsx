import React, { useState } from "react";
import { FileText, Download, FileType } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Report {
	id: string;
	title: string;
	description: string;
	lastGenerated: string;
	type: "inventory" | "sales" | "low_stock";
}

const reports: Report[] = [
	{
		id: "1",
		title: "Inventory Report",
		description: "Complete list of all products and their current stock levels",
		lastGenerated: "2024-01-20T10:30:00Z",
		type: "inventory",
	},
	{
		id: "2",
		title: "Sales Report",
		description: "Detailed report of all sales transactions",
		lastGenerated: "2024-01-20T09:15:00Z",
		type: "sales",
	},
	{
		id: "3",
		title: "Low Stock Report",
		description: "List of products that are below their threshold levels",
		lastGenerated: "2024-01-20T11:45:00Z",
		type: "low_stock",
	},
];

export const Reports: React.FC = () => {
	const [isGenerating, setIsGenerating] = useState<string | null>(null);

	const generatePDF = async (report: Report) => {
		setIsGenerating(report.id);
		try {
			const doc = new jsPDF();

			// Add header
			doc.setFontSize(20);
			doc.text(report.title, 20, 20);

			// Add metadata
			doc.setFontSize(12);
			doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

			// Add description
			doc.text(report.description, 20, 40);

			// Add sample data based on report type
			const data = await getSampleData(report.type);
			autoTable(doc, {
				head: [Object.keys(data[0])],
				body: data.map(Object.values),
				startY: 50,
				theme: "grid",
				styles: { fontSize: 10 },
				headStyles: { fillColor: [41, 128, 185] },
			});

			// Save the PDF
			doc.save(`${report.title.toLowerCase().replace(/\s+/g, "_")}.pdf`);
			toast.success(`${report.title} downloaded successfully`);
		} catch (error) {
			console.error("Error generating PDF:", error);
			toast.error(`Failed to generate ${report.title}`);
		} finally {
			setIsGenerating(null);
		}
	};

	const generateCSV = async (report: Report) => {
		setIsGenerating(report.id);
		try {
			const data = await getSampleData(report.type);
			const headers = Object.keys(data[0]).join(",");
			const rows = data.map((row) => Object.values(row).join(",")).join("\n");
			const csv = `${headers}\n${rows}`;

			const blob = new Blob([csv], { type: "text/csv" });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${report.title.toLowerCase().replace(/\s+/g, "_")}.csv`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);

			toast.success(`${report.title} downloaded successfully`);
		} catch (error) {
			console.error("Error generating CSV:", error);
			toast.error(`Failed to generate ${report.title}`);
		} finally {
			setIsGenerating(null);
		}
	};

	return (
		<div className="max-w-7xl mx-auto space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
					Reports
				</h1>
				<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
					Generate and download reports for inventory, sales, and more
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{reports.map((report) => (
					<div
						key={report.id}
						className="bg-white dark:bg-neutral-800 shadow-sm rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
					>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
									{report.title}
								</h3>
								<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
									{report.description}
								</p>
								<p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
									Last generated:{" "}
									{new Date(report.lastGenerated).toLocaleString()}
								</p>
							</div>
							<div className="ml-4">
								<FileText className="w-6 h-6 text-neutral-400" />
							</div>
						</div>

						<div className="mt-6 flex gap-3">
							<Button
								onClick={() => generatePDF(report)}
								disabled={isGenerating === report.id}
								variant="outline"
								className="flex-1 gap-2"
							>
								<FileType className="w-4 h-4" />
								{isGenerating === report.id ? "Generating..." : "PDF"}
							</Button>
							<Button
								onClick={() => generateCSV(report)}
								disabled={isGenerating === report.id}
								variant="outline"
								className="flex-1 gap-2"
							>
								<Download className="w-4 h-4" />
								{isGenerating === report.id ? "Generating..." : "CSV"}
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

// Helper function to generate sample data based on report type
async function getSampleData(type: Report["type"]) {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	switch (type) {
		case "inventory":
			return [
				{
					SKU: "LP001",
					Name: "Laptop Pro X",
					Category: "Electronics",
					Stock: 25,
					Value: "$25,000",
				},
				{
					SKU: "OM002",
					Name: "Office Mouse",
					Category: "Accessories",
					Stock: 150,
					Value: "$3,000",
				},
				// Add more sample data as needed
			];

		case "sales":
			return [
				{
					Date: "2024-01-20",
					Product: "Laptop Pro X",
					Quantity: 2,
					Revenue: "$2,000",
				},
				{
					Date: "2024-01-19",
					Product: "Office Mouse",
					Quantity: 5,
					Revenue: "$100",
				},
				// Add more sample data as needed
			];

		case "low_stock":
			return [
				{
					SKU: "KB003",
					Name: "Keyboard Elite",
					CurrentStock: 5,
					Threshold: 10,
					Status: "Critical",
				},
				{
					SKU: "HD004",
					Name: "External HDD",
					CurrentStock: 8,
					Threshold: 15,
					Status: "Warning",
				},
				// Add more sample data as needed
			];

		default:
			return [];
	}
}
