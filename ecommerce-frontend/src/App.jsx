import { useState } from "react";
import { Cart } from "./components/Cart";
import ProductsGrid from "./components/ProductsGrid";
import ThemeToggle from "./components/ui/ThemeToggle";

export default function App() {
	const [cart, setCart] = useState(() => {
		return JSON.parse(localStorage.getItem("cart")) || [];
	});

	const cartStorageFn = (product, quantity, mode) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(item) => item.product.id === product.id,
			);

			let updatedCart;
			if (existingItem) {
				updatedCart = prevCart
					.map((item) =>
						item.product.id === product.id
							? {
									...item,
									quantity:
										mode === "add"
											? item.quantity < item.product.stock
												? item.quantity + quantity
												: item.quantity
											: item.quantity - quantity,
								}
							: item,
					)
					.filter((item) => item.quantity > 0);
			} else {
				updatedCart = [...prevCart, { product, quantity }];
			}

			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center px-10 py-5 border">
				<div>Sahara</div>
				<div className="flex justify-between items-center gap-5">
					<ThemeToggle />
					<Cart cart={cart} cartStorageFn={cartStorageFn} />
				</div>
			</div>
			<ProductsGrid cartStorageFn={cartStorageFn} />
		</div>
	);
}
