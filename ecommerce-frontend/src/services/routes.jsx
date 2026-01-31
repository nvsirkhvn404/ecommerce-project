import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "", element: <HomePage /> },
			{ path: "login", element: <LoginPage /> },
		],
	},
]);

export default router;
