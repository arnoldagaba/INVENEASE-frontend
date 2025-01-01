import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

interface Notification {
	id: string;
	title: string;
	message: string;
	type: "info" | "warning" | "error" | "success";
	read: boolean;
	createdAt: Date;
}

export const Notifications: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: "1",
			title: "Low Stock Alert",
			message: "Laptop Pro X is running low on stock",
			type: "warning",
			read: false,
			createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
		},
		{
			id: "2",
			title: "New Order",
			message: "New order #1234 has been placed",
			type: "success",
			read: false,
			createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
		},
	]);

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAsRead = (id: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	};

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	};

	const getTimeAgo = (date: Date) => {
		const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
		if (seconds < 60) return "just now";
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;
		return `${Math.floor(hours / 24)}d ago`;
	};

	return (
		<div className="relative">
			<Button
				variant="ghost"
				size="icon"
				className="relative"
				onClick={() => setIsOpen(!isOpen)}
			>
				<Bell className="h-5 w-5" />
				{unreadCount > 0 && (
					<span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error-500 text-[10px] font-medium text-white flex items-center justify-center">
						{unreadCount}
					</span>
				)}
			</Button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-30"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute right-0 z-40 mt-2 w-80 rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-700">
						<div className="p-4">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
									Notifications
								</h3>
								{unreadCount > 0 && (
									<button
										onClick={markAllAsRead}
										className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
									>
										Mark all as read
									</button>
								)}
							</div>
							<div className="space-y-3">
								{notifications.length === 0 ? (
									<p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-4">
										No notifications
									</p>
								) : (
									notifications.map((notification) => (
										<div
											key={notification.id}
											className={cn(
												"p-3 rounded-md transition-colors",
												notification.read
													? "bg-neutral-50 dark:bg-neutral-800"
													: "bg-primary-50 dark:bg-primary-900/20"
											)}
											onClick={() => markAsRead(notification.id)}
										>
											<div className="flex items-start justify-between">
												<div>
													<p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
														{notification.title}
													</p>
													<p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
														{notification.message}
													</p>
												</div>
												<span className="text-xs text-neutral-400 dark:text-neutral-500">
													{getTimeAgo(notification.createdAt)}
												</span>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
