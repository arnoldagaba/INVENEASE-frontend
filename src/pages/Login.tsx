import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Package } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/auth";

export const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const { user, token } = await authService.login(email, password);
			login(user, token);
			navigate("/", { replace: true });
		} catch (error) {
			toast.error("Invalid credentials");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<Package className="mx-auto h-12 w-12 text-primary-600" />
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
						Welcome to InvenEase
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Sign in to manage your inventory or{" "}
						<Link
							to="/signup"
							className="text-primary-600 hover:text-primary-500"
						>
							create an account
						</Link>
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-800"
								placeholder="Email address"
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-800"
								placeholder="Password"
							/>
						</div>
					</div>

					<div className="flex items-center justify-end">
						<Link
							to="/request-reset"
							className="text-sm text-primary-600 hover:text-primary-500"
						>
							Forgot your password?
						</Link>
					</div>

					<Button type="submit" className="w-full" isLoading={isLoading}>
						Sign in
					</Button>
				</form>
			</div>
		</div>
	);
};
