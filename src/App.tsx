import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./hooks/useTheme";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store/auth";
import { authService } from "./services/auth";

// Auth Pages
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { RequestReset } from "./pages/RequestReset";
import { ResetPassword } from "./pages/ResetPassword";

// Protected Pages
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Categories } from "./pages/Categories";
import { Inventory } from "./pages/Inventory";
import { Orders } from "./pages/Orders";
import { Transactions } from "./pages/Transactions";
import { Analytics } from "./pages/Analytics";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

// Auth Guard Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const token = localStorage.getItem("token");

	// If there's a token but not authenticated in store, try to restore session
	useEffect(() => {
		const restoreSession = async () => {
			if (token && !isAuthenticated) {
				try {
					const user = await authService.getCurrentUser();
					useAuthStore.getState().login(user, token);
				} catch (error) {
					localStorage.removeItem("token");
					localStorage.removeItem("user");
				}
			}
		};
		restoreSession();
	}, [token, isAuthenticated]);

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
};

function App() {
	const { theme } = useTheme();

	// Apply theme class to html element
	useEffect(() => {
		const root = document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
			root.classList.remove("light");
		} else {
			root.classList.add("light");
			root.classList.remove("dark");
		}
		// Update color scheme meta tag
		document
			.querySelector('meta[name="color-scheme"]')
			?.setAttribute("content", theme);
	}, [theme]);

	return (
		<ErrorBoundary>
			<Router>
				<div
					className={`min-h-screen transition-colors duration-200 ${
						theme === "dark"
							? "bg-neutral-900 text-white"
							: "bg-neutral-50 text-black"
					}`}
				>
					<Routes>
						{/* Public Routes */}
						<Route element={<Layout />}>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/request-reset" element={<RequestReset />} />
							<Route path="/reset-password" element={<ResetPassword />} />
						</Route>

						{/* Protected Routes */}
						<Route
							element={
								<ProtectedRoute>
									<DashboardLayout />
								</ProtectedRoute>
							}
						>
							<Route path="/" element={<Navigate to="/dashboard" replace />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/products" element={<Products />} />
							<Route path="/categories" element={<Categories />} />
							<Route path="/inventory" element={<Inventory />} />
							<Route path="/orders" element={<Orders />} />
							<Route path="/transactions" element={<Transactions />} />
							<Route path="/analytics" element={<Analytics />} />
							<Route path="/reports" element={<Reports />} />
							<Route path="/settings" element={<Settings />} />
						</Route>
					</Routes>

					<ToastContainer
						position="bottom-right"
						theme={theme}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</div>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
