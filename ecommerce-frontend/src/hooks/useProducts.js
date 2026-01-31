import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/products");

export default function useProducts(productQuery) {
	return useInfiniteQuery({
		queryKey: ["products", productQuery],
		initialPageParam: 1,
		queryFn: ({ pageParam = 1 }) =>
			apiClient.getAll({
				params: { ...productQuery, page: pageParam, limit: 32 },
			}),
		getNextPageParam: (lastPage) => {
			return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
		},
		staleTime: 1000 * 60 * 60,
	});
}
