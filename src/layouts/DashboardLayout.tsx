import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export const DashboardLayout = () => {
	return (
		<div className="flex h-screen bg-neutral-50 dark:bg-neutral-900">
			<Sidebar />
			<div className="flex-1 flex flex-col min-w-0">
				<Header />
				<main className="flex-1 overflow-y-auto p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};
