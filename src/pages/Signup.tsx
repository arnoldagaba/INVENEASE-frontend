import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Package } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/auth";
import axios from "axios";

export const Signup: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);

	const validateForm = () => {
		if (!name.trim()) {
			toast.error("Name is required");
			return false;
		}

		if (!email.trim()) {
			toast.error("Email is required");
			return false;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			toast.error("Please enter a valid email address");
			return false;
		}

		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			return false;
		}

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			const { user, token } = await authService.signup({
				name: name.trim(),
				email: email.trim().toLowerCase(),
				password,
			});

			login(user, token);
			toast.success("Account created successfully!");
			navigate("/", { replace: true });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message =
					error.response?.data?.message || "Failed to create account";
				toast.error(message);

				if (error.response?.status === 409) {
					toast.error("Email is already registered");
				}
			} else {
				toast.error("An unexpected error occurred");
			}
			console.error("Signup error:", error);
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
						Create your account
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Or{" "}
						<Link
							to="/login"
							className="text-primary-600 hover:text-primary-500"
						>
							sign in to your account
						</Link>
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="name" className="sr-only">
								Full Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-800"
								placeholder="Full Name"
								minLength={2}
								maxLength={50}
							/>
						</div>
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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-800"
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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-800"
								placeholder="Password (min. 6 characters)"
								minLength={6}
							/>
						</div>
						<div>
							<label htmlFor="confirmPassword" className="sr-only">
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								required
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-800"
								placeholder="Confirm Password"
								minLength={6}
							/>
						</div>
					</div>

					<Button type="submit" className="w-full" isLoading={isLoading}>
						Create Account
					</Button>
				</form>
			</div>
		</div>
	);
};
