import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Package } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/authStore";
import { authService } from "../../services/auth";

export const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuthStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await authService.login({ email, password });
			login(response.user, response.token);
			toast.success("Login successful!");
			navigate("/", { replace: true });
		} catch (error: any) {
			toast.error(error.message || "Failed to login");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<Package className="mx-auto h-12 w-12 text-primary-600" />
					<h2 className="mt-6 text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">
						Welcome to InvenEase
					</h2>
					<p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
						Sign in to manage your inventory or{" "}
						<Link
							to="/signup"
							className="text-primary-600 hover:text-primary-500"
						>
							create an account
						</Link>
					</p>
				</div>

				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
							>
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
								placeholder="you@example.com"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
								placeholder="••••••••"
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm">
							<Link
								to="/request-reset"
								className="text-primary-600 hover:text-primary-500"
							>
								Forgot your password?
							</Link>
						</div>
					</div>

					<Button
						type="submit"
						disabled={isLoading}
						className="w-full flex justify-center py-2 px-4"
					>
						{isLoading ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</div>
		</div>
	);
};
