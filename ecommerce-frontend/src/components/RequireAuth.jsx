import { Navigate } from "react-router";

export default function RequireAuth({ children }) {
	const auth = JSON.parse(localStorage.getItem("user"));

	if (!auth?.token) {
		return <Navigate to="/login" replace />;
	}

	return children;
}