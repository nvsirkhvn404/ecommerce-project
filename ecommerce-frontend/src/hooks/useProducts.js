import { useQuery } from "@tanstack/react-query";
import APIClient from "../service/api-client";

const apiClient = new APIClient("/products");

export default function useProducts(productQuery) {
	return useQuery({
		queryKey: ["products", productQuery],
		queryFn: () =>
			apiClient.getAll({
				params: productQuery,
			}),
	});
}
