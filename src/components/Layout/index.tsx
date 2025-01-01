import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";

export const Layout: React.FC = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex h-screen bg-gray-100 dark:bg-gray-900">
			{/* Mobile sidebar backdrop */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<Sidebar onClose={() => setIsSidebarOpen(false)} />
			</div>

			{/* Main content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				<Header onMenuClick={toggleSidebar} />
				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
