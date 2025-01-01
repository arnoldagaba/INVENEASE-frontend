import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { RequestReset } from "./pages/RequestReset";
import { ResetPassword } from "./pages/ResetPassword";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Categories } from "./pages/Categories";
import { Orders } from "./pages/Orders";
import { Analytics } from "./pages/Analytics";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { useTheme } from "./hooks/useTheme";

function App() {
	const { theme } = useTheme();

	return (
		<div className={theme}>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/request-reset" element={<RequestReset />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route
						element={
							<PrivateRoute>
								<Layout />
							</PrivateRoute>
						}
					>
						<Route path="/" element={<Dashboard />} />
						<Route path="/products" element={<Products />} />
						<Route path="/categories" element={<Categories />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/analytics" element={<Analytics />} />
						<Route path="/reports" element={<Reports />} />
						<Route path="/settings" element={<Settings />} />
					</Route>
				</Routes>
			</Router>
			<ToastContainer
				position="bottom-right"
				theme={theme === "dark" ? "dark" : "light"}
			/>
		</div>
	);
}

export default App;
