import { useState } from "react";
import ProductsGrid from "./components/ProductsGrid";
import { Button } from "./components/ui/button";

export default function App() {
	const [sort, setSort] = useState("asc");
	return (
		<>
			<div>
				<Button
					onClick={() => (sort === "asc" ? setSort("desc") : setSort("asc"))}
				>
					{sort}
				</Button>
			</div>
			<ProductsGrid sort={sort}/>
			<Button>Load More</Button>
		</>
	);
}
