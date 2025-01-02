import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Package } from "lucide-react";
import { useAuthStore } from "../store/auth";
import { authService } from "../services/auth";

export const Login = () => {
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
			toast.success("Welcome back!");
			navigate("/dashboard", { replace: true });
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Failed to login");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md space-y-8">
			<div className="text-center">
				<Package className="mx-auto h-12 w-12 text-blue-600" />
				<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
					Welcome back
				</h2>
				<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
					Don't have an account?{" "}
					<Link to="/signup" className="text-blue-600 hover:text-blue-500">
						Sign up
					</Link>
				</p>
			</div>

			<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
				<div className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
							className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
							className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							placeholder="••••••••"
						/>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="text-sm">
						<Link
							to="/request-reset"
							className="text-blue-600 hover:text-blue-500"
						>
							Forgot your password?
						</Link>
					</div>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isLoading ? "Signing in..." : "Sign in"}
				</button>
			</form>
		</div>
	);
};
