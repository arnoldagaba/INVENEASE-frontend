import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { transactionsApi } from "../../services/api";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/format";
import { TransactionModal } from "./TransactionModal";

interface Transaction {
	id: string;
	type: "stock-in" | "stock-out";
	productId: {
		id: string;
		name: string;
		sku: string;
		price: number;
	};
	quantity: number;
	price: number;
	date: string;
}

interface TransactionDetailsProps {
	transaction: Transaction;
	onClose: () => void;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
	transaction,
	onClose,
}) => {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Product
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{transaction.productId.name}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						SKU
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{transaction.productId.sku}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Type
					</label>
					<p className="mt-1">
						<span
							className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
								transaction.type === "stock-in"
									? "bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-200"
									: "bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-200"
							}`}
						>
							{transaction.type === "stock-in" ? "Stock In" : "Stock Out"}
						</span>
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Quantity
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{transaction.quantity} units
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Price
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{formatCurrency(transaction.price)}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Total Value
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{formatCurrency(transaction.price * transaction.quantity)}
					</p>
				</div>
				<div>
					<label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Date
					</label>
					<p className="mt-1 text-sm text-neutral-900 dark:text-neutral-50">
						{format(new Date(transaction.date), "PPp")}
					</p>
				</div>
			</div>

			<div className="mt-6 flex justify-end">
				<Button variant="outline" onClick={onClose}>
					Close
				</Button>
			</div>
		</div>
	);
};

export const Transactions: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
		useState(false);

	const fetchTransactions = async () => {
		try {
			const response = await transactionsApi.getAll();
			setTransactions(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching transactions:", error);
			toast.error("Failed to load transactions");
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTransactions();
	}, []);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
						Transactions
					</h1>
					<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
						View and manage inventory transactions
					</p>
				</div>
				<Button
					className="gap-2"
					onClick={() => setIsNewTransactionModalOpen(true)}
				>
					<Plus className="h-4 w-4" />
					Add Transaction
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
										Type
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Quantity
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Price
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Total Value
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
										Date
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
								{transactions.map((transaction) => (
									<tr
										key={transaction.id}
										className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer"
										onClick={() => setSelectedTransaction(transaction)}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
												{transaction.productId.name}
											</div>
											<div className="text-sm text-neutral-500 dark:text-neutral-400">
												{transaction.productId.sku}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													transaction.type === "stock-in"
														? "bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-200"
														: "bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-200"
												}`}
											>
												{transaction.type === "stock-in"
													? "Stock In"
													: "Stock Out"}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
											{transaction.quantity} units
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
											{formatCurrency(transaction.price)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
											{formatCurrency(transaction.price * transaction.quantity)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
											{format(new Date(transaction.date), "PP")}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			<Modal
				isOpen={!!selectedTransaction}
				onClose={() => setSelectedTransaction(null)}
				title="Transaction Details"
			>
				{selectedTransaction && (
					<TransactionDetails
						transaction={selectedTransaction}
						onClose={() => setSelectedTransaction(null)}
					/>
				)}
			</Modal>

			<TransactionModal
				isOpen={isNewTransactionModalOpen}
				onClose={() => setIsNewTransactionModalOpen(false)}
				onSuccess={() => {
					fetchTransactions();
					setIsNewTransactionModalOpen(false);
				}}
			/>
		</div>
	);
};
