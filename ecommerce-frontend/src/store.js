import { create } from "zustand";

const useLocalCart = create((set) => ({
	cart: JSON.parse(localStorage.getItem("cart")) || [],
	cartFn: (product, mode = "ADD") =>
		set((store) => {
			const existingItem = store.cart.find(
				(item) => item.product.id === product.id,
			);

			let updatedCart;
			if (existingItem) {
				updatedCart = store.cart
					.map((item) =>
						item.product.id === product.id
							? {
									...item,
									quantity:
										mode === "ADD"
											? item.quantity < item.product.stock
												? item.quantity + 1
												: item.quantity
											: item.quantity - 1,
								}
							: item,
					)
					.filter((item) => item.quantity > 0);
			} else {
				updatedCart = [...store.cart, { product, quantity: 1 }];
			}

			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return { cart: updatedCart };
		}),
}));

export default useLocalCart;
