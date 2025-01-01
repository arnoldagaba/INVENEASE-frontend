import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
	LayoutDashboard,
	Package,
	Tags,
	ClipboardList,
	BarChart3,
	FileText,
	Settings,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

const navigation = [
	{ name: "Dashboard", href: "/", icon: LayoutDashboard },
	{ name: "Products", href: "/products", icon: Package },
	{ name: "Categories", href: "/categories", icon: Tags },
	{ name: "Transactions", href: "/transactions", icon: ClipboardList },
	{ name: "Analytics", href: "/analytics", icon: BarChart3 },
	{ name: "Reports", href: "/reports", icon: FileText },
	{ name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
	const [isMinimized, setIsMinimized] = useState(false);

	return (
		<div
			className={cn(
				"flex flex-col h-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300",
				isMinimized ? "w-[4rem]" : "w-64"
			)}
		>
			<div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-neutral-800">
				<h1
					className={cn(
						"font-semibold text-xl text-neutral-900 dark:text-neutral-100 transition-opacity duration-300",
						isMinimized && "opacity-0"
					)}
				>
					InvenEase
				</h1>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsMinimized(!isMinimized)}
					className="ml-auto"
				>
					{isMinimized ? (
						<ChevronRight className="h-5 w-5" />
					) : (
						<ChevronLeft className="h-5 w-5" />
					)}
				</Button>
			</div>
			<nav className="flex-1 overflow-y-auto p-2 space-y-1">
				{navigation.map((item) => (
					<NavLink
						key={item.name}
						to={item.href}
						className={({ isActive }) =>
							cn(
								"flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
								isActive
									? "bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400"
									: "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/50",
								isMinimized && "justify-center"
							)
						}
					>
						<item.icon className="h-5 w-5 flex-shrink-0" />
						<span
							className={cn(
								"ml-3 transition-opacity duration-300",
								isMinimized && "hidden"
							)}
						>
							{item.name}
						</span>
					</NavLink>
				))}
			</nav>
		</div>
	);
};
