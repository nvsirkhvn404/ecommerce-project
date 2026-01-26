import useProducts from "@/hooks/useProducts";
import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ProductsGrid() {
	const inputRef = useRef(null);
	const [sort, setSort] = useState("asc");
	const [inputValue, setInputValue] = useState("");

	const { data, hasNextPage, fetchNextPage } = useProducts({
		sort: sort,
		q: inputValue,
	});

	return (
		<div className="flex flex-col gap-5 p-10">
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
			<Button
				className="self-start"
				onClick={() => (sort === "asc" ? setSort("desc") : setSort("asc"))}
			>
				{sort}
			</Button>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
				{data?.pages.map((page) =>
					page.data.map((product) => (
						<ProductCard key={product._id} product={product} />
					)),
				)}
			</div>
			{hasNextPage && (
				<Button onClick={() => fetchNextPage()}>Load More</Button>
			)}
		</div>
	);
}
