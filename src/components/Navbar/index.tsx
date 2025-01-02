import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
	Search,
	Bell,
	Sun,
	Moon,
	User,
	Settings,
	LogOut,
	ChevronDown,
	Menu,
} from "lucide-react";

interface NavbarProps {
	onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
	const { user, logout } = useAuthStore();
	const { theme, toggleTheme } = useTheme();
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const userMenuRef = useRef<HTMLDivElement>(null);

	// Handle click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				userMenuRef.current &&
				!userMenuRef.current.contains(event.target as Node)
			) {
				setIsUserMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		// Implement search functionality
		console.log("Searching for:", searchQuery);
	};

	const handleLogout = () => {
		logout();
		setIsUserMenuOpen(false);
	};

	return (
		<nav className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Mobile menu button */}
					{onMenuClick && (
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={onMenuClick}
							className="p-2 rounded-md lg:hidden hover:bg-neutral-100 dark:hover:bg-neutral-700"
							aria-label="Open menu"
						>
							<Menu className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
						</motion.button>
					)}

					{/* Search Bar */}
					<div className="flex-1 max-w-lg">
						<form onSubmit={handleSearch} className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Search className="h-5 w-5 text-neutral-400" />
							</div>
							<motion.input
								initial={false}
								whileFocus={{ scale: 1.01 }}
								transition={{ duration: 0.2 }}
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="block w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
								placeholder="Search..."
							/>
						</form>
					</div>

					{/* Right Section */}
					<div className="flex items-center space-x-4">
						{/* Theme Toggle */}
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								variant="ghost"
								size="icon"
								onClick={toggleTheme}
								className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
							>
								<motion.div
									initial={false}
									animate={{ rotate: theme === "dark" ? 180 : 0 }}
									transition={{ duration: 0.3 }}
								>
									{theme === "dark" ? (
										<Sun className="h-5 w-5" />
									) : (
										<Moon className="h-5 w-5" />
									)}
								</motion.div>
							</Button>
						</motion.div>

						{/* Notifications */}
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								variant="ghost"
								size="icon"
								className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
							>
								<Bell className="h-5 w-5" />
							</Button>
						</motion.div>

						{/* User Menu */}
						<div className="relative" ref={userMenuRef}>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									variant="ghost"
									onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
									className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-200"
								>
									<div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
										<User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
									</div>
									<span className="text-sm font-medium">{user?.name}</span>
									<motion.div
										animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
										transition={{ duration: 0.2 }}
									>
										<ChevronDown className="h-4 w-4" />
									</motion.div>
								</Button>
							</motion.div>

							<AnimatePresence>
								{isUserMenuOpen && (
									<motion.div
										initial={{ opacity: 0, scale: 0.95, y: -10 }}
										animate={{ opacity: 1, scale: 1, y: 0 }}
										exit={{ opacity: 0, scale: 0.95, y: -10 }}
										transition={{ duration: 0.2, type: "spring", bounce: 0.3 }}
										className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5"
									>
										<div
											className="py-1"
											role="menu"
											aria-orientation="vertical"
											aria-labelledby="user-menu"
										>
											<motion.div
												whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
											>
												<Link
													to="/settings"
													className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
													onClick={() => setIsUserMenuOpen(false)}
												>
													<Settings className="h-4 w-4 mr-3" />
													Settings
												</Link>
											</motion.div>
											<motion.button
												whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
												onClick={handleLogout}
												className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
											>
												<LogOut className="h-4 w-4 mr-3" />
												Sign out
											</motion.button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
