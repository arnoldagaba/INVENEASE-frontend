import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/authStore";
import { authService } from "../../services/auth";

export const Settings: React.FC = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const user = useAuthStore((state) => state.user);

	const handlePasswordChange = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			toast.error("New passwords do not match");
			return;
		}

		if (newPassword.length < 6) {
			toast.error("New password must be at least 6 characters long");
			return;
		}

		setIsLoading(true);

		try {
			await authService.updatePassword(currentPassword, newPassword);
			toast.success("Password updated successfully");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (error) {
			toast.error("Failed to update password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto py-6 space-y-8">
			<div>
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Settings
				</h2>
				<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
					Manage your account settings and preferences
				</p>
			</div>

			<div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
				<h3 className="text-lg font-medium text-gray-900 dark:text-white">
					Account Information
				</h3>
				<div className="mt-4 space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Name
						</label>
						<p className="mt-1 text-sm text-gray-900 dark:text-white">
							{user?.name}
						</p>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Email
						</label>
						<p className="mt-1 text-sm text-gray-900 dark:text-white">
							{user?.email}
						</p>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Role
						</label>
						<p className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
							{user?.role}
						</p>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
				<h3 className="text-lg font-medium text-gray-900 dark:text-white">
					Change Password
				</h3>
				<form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
					<div>
						<label
							htmlFor="currentPassword"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Current Password
						</label>
						<input
							id="currentPassword"
							type="password"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							required
							className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
						/>
					</div>
					<div>
						<label
							htmlFor="newPassword"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							New Password
						</label>
						<input
							id="newPassword"
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
							minLength={6}
							className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
						/>
					</div>
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Confirm New Password
						</label>
						<input
							id="confirmPassword"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							minLength={6}
							className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
						/>
					</div>
					<div>
						<Button type="submit" className="w-full" isLoading={isLoading}>
							Update Password
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
