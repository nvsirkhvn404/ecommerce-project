import useProducts from "@/hooks/useProducts";
import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import SortSection from "./SortSection";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ProductsGrid() {
	const inputRef = useRef(null);
	const [sortOrder, setSortOrder] = useState("asc");
	const [sortField, setSortField] = useState("title");
	const [inputValue, setInputValue] = useState("");

	const { data, hasNextPage, fetchNextPage } = useProducts({
		sort: sortOrder,
		sortField,
		q: inputValue,
	});
	return (
		<div className="flex flex-col gap-5 px-10">
			<form
				className="flex gap-5"
				onSubmit={(e) => {
					e.preventDefault();
					setInputValue(inputRef.current?.value);
				}}
			>
				<Input ref={inputRef} />
				<Button>Search</Button>
			</form>

			<SortSection
				setSortField={setSortField}
				setSortOrder={setSortOrder}
				sortOrder={sortOrder}
			/>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
				{data?.pages.map((page) =>
					page.data.map((product) => (
							<ProductCard product={product} key={product._id} />
					)),
				)}
			</div>
			{hasNextPage && (
				<Button onClick={() => fetchNextPage()}>Load More</Button>
			)}
		</div>
	);
}
