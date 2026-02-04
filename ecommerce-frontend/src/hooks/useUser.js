import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient("/auth/user");

export default function useUser() {
	const auth = JSON.parse(localStorage.getItem("user") || "null");

	return useQuery({
		queryKey: ["user"],
		queryFn: () =>
			apiClient.getAll({
				headers: {
					authorization: `Bearer ${auth.token}`,
				},
			}),
		staleTime: 1000 * 60 * 60,
		enabled: !!auth?.token,
	});
}
