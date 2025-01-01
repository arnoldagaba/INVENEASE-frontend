import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Tags, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const navItems = [
	{ to: "/", icon: LayoutDashboard, label: "Dashboard" },
	{ to: "/inventory", icon: Package, label: "Inventory" },
	{ to: "/categories", icon: Tags, label: "Categories" },
	{ to: "/settings", icon: Settings, label: "Settings" },
];

export const Sidebar: React.FC = () => {
	const logout = useAuthStore((state) => state.logout);

	return (
		<aside className="w-64 bg-white dark:bg-gray-800 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-gray-700">
			<div className="flex flex-col h-full">
				<div className="p-4">
					<h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
						InvenEase
					</h1>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Inventory Management
					</p>
				</div>

				<nav className="flex-1 px-2 py-4 space-y-1">
					{navItems.map(({ to, icon: Icon, label }) => (
						<NavLink
							key={to}
							to={to}
							className={({ isActive }) =>
								`flex items-center px-4 py-2 rounded-md transition-colors ${
									isActive
										? "bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
										: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
								}`
							}
						>
							<Icon className="w-5 h-5 mr-3" />
							{label}
						</NavLink>
					))}
				</nav>

				<div className="p-4 border-t border-gray-200 dark:border-gray-700">
					<button
						onClick={logout}
						className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
					>
						<LogOut className="w-5 h-5 mr-3" />
						Logout
					</button>
				</div>
			</div>
		</aside>
	);
};
