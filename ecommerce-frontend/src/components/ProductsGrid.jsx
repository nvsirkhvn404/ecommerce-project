import useProducts from "@/hooks/useProducts";
import { Fragment, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ProductsGrid({ sort }) {
	const inputRef = useRef(null);
	const [inputValue, setInputValue] = useState("");

	const { data } = useProducts({ sort: sort, q: inputValue });
	console.log(data);
	
	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setInputValue(inputRef.current?.value);
				}}
			>
				<Input ref={inputRef} />
				<Button>Search</Button>
			</form>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-10">
				{data?.map((product) => (
					<Fragment key={product.id}>
						<ProductCard product={product} />
					</Fragment>
				))}
			</div>
		</>
	);
}
