import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { cn } from "../lib/utils";

export const DashboardLayout = () => {
	const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Set initial sidebar state based on screen size
	useEffect(() => {
		const handleResize = () => {
			const isSmallScreen = window.innerWidth < 1024;
			setIsSidebarMinimized(isSmallScreen);
			if (!isSmallScreen) {
				setIsMobileMenuOpen(false);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Handle click outside for mobile menu
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isMobileMenuOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				!(event.target as Element).closest('button[aria-label="Open menu"]')
			) {
				setIsMobileMenuOpen(false);
			}
		};

		if (isMobileMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMobileMenuOpen]);

	const toggleMinimize = () => {
		setIsSidebarMinimized(!isSidebarMinimized);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
			{/* Mobile overlay */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-20 lg:hidden"
					onClick={closeMobileMenu}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar wrapper */}
			<div
				ref={sidebarRef}
				className={cn(
					// Base styles
					"fixed inset-y-0 left-0 z-30 lg:relative",
					// Mobile styles
					"lg:block",
					{
						// Show/hide on mobile
						"translate-x-0": isMobileMenuOpen,
						"-translate-x-full": !isMobileMenuOpen,
					},
					// Desktop styles (override mobile transforms)
					"lg:translate-x-0",
					// Transitions
					"transition-transform duration-300 ease-in-out"
				)}
			>
				<Sidebar
					isMinimized={isSidebarMinimized}
					onToggleMinimize={toggleMinimize}
					onClose={closeMobileMenu}
				/>
			</div>

			{/* Main content */}
			<div className="flex-1 flex flex-col min-w-0">
				<Navbar onMenuClick={toggleMobileMenu} />
				<main className="flex-1 overflow-y-auto p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
