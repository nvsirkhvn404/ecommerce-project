import Navbar from "./components/Navbar";
import ProductsGrid from "./components/ProductsGrid";

export default function App() {
	return (
		<div className="flex flex-col gap-5">
			<Navbar />
			<ProductsGrid />
		</div>
	);
}
