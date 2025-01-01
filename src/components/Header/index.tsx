import React from "react";
import { useAuthStore } from "../../store/authStore";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/Button";
import { Menu, Moon, Sun } from "lucide-react";
import { Search } from "../Search";
import { Notifications } from "../Notifications";

interface HeaderProps {
	onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
	const { theme, toggleTheme } = useTheme();
	const { user, logout } = useAuthStore();

	return (
		<header className="bg-white dark:bg-neutral-800 shadow-sm">
			<div className="px-4 py-3 flex items-center gap-4">
				{/* Mobile menu button */}
				<button
					onClick={onMenuClick}
					className="p-2 rounded-md lg:hidden hover:bg-neutral-100 dark:hover:bg-neutral-700"
					aria-label="Open menu"
				>
					<Menu className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
				</button>

				{/* Search */}
				<div className="hidden md:block flex-1 max-w-xl">
					<Search />
				</div>

				{/* Right side items */}
				<div className="flex items-center gap-2 ml-auto">
					<Notifications />

					{/* Theme toggle */}
					<button
						onClick={toggleTheme}
						className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
						aria-label="Toggle theme"
					>
						{theme === "dark" ? (
							<Sun className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
						) : (
							<Moon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
						)}
					</button>

					{/* User info and logout */}
					<div className="flex items-center gap-4">
						<div className="hidden sm:block">
							<p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
								{user?.name}
							</p>
							<p className="text-xs text-neutral-500 dark:text-neutral-400">
								{user?.email}
							</p>
						</div>
						<Button variant="outline" onClick={logout} className="text-sm">
							Logout
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile search */}
			<div className="md:hidden px-4 pb-3">
				<Search />
			</div>
		</header>
	);
};
