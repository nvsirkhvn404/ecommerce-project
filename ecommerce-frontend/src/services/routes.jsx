import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import RegisterPage from "@/pages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage";
import RequireAuth from "@/components/RequireAuth";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "", element: <HomePage /> },
			{ path: "login", element: <LoginPage /> },
			{ path: "register", element: <RegisterPage /> },
			{
				path: "profile",
				element: (
					<RequireAuth>
						<ProfilePage />
					</RequireAuth>
				),
			},
		],
	},
]);

export default router;
