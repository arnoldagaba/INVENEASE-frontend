import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";

export const Layout: React.FC = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const toggleMinimize = () => {
		setIsSidebarMinimized(!isSidebarMinimized);
	};

	return (
		<div className="flex h-screen bg-neutral-100 dark:bg-neutral-900">
			{/* Mobile sidebar backdrop */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-30 transform lg:relative lg:translate-x-0 transition-all duration-300 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<Sidebar
					isMinimized={isSidebarMinimized}
					onToggleMinimize={toggleMinimize}
				/>
			</div>

			{/* Main content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				<Header onMenuClick={toggleSidebar} />
				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 dark:bg-neutral-900 p-4">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
