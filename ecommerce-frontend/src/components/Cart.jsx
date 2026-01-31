import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import useLocalCart from "@/store";
import QuantityControl from "./QuantityControl";
import { Badge } from "./ui/badge";

export function Cart() {
	const { cart, cartFn } = useLocalCart();
	let subtotal = 0;
	let totalQuantity = 0;
	if (cart)
		cart.forEach((item) => {
			subtotal += item.product.price * item.quantity;
			totalQuantity += item.quantity;
		});

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">
					Cart
					{totalQuantity ? (
						<Badge className="rounded-full">{totalQuantity}</Badge>
					) : (
						""
					)}
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Your Cart</SheetTitle>
					<SheetDescription>
						Add More products in the cart or go to checkout
					</SheetDescription>
				</SheetHeader>
				{cart.length ? (
					<>
						<div className="overflow-y-auto px-2">
							{cart.map((item, index) => (
								<div key={index} className="flex flex-col py-2 gap-2 border-b">
									<div className="flex items-center gap-2">
										<img src={item.product.thumbnail} className="h-20" />
										<div>
											<p className="font-semibold">{item.product.title}</p>
											<p className="font-semibold">${item.product.price}</p>
										</div>
									</div>
									<QuantityControl
										quantity={item.quantity}
										stock={item.product.stock}
										onAdd={() => cartFn(item.product, "ADD")}
										onSubtract={() => cartFn(item.product, "SUBTRACT")}
									/>
								</div>
							))}
						</div>
						<SheetFooter>
							Subtotal: ${subtotal.toFixed(2)}
							<Button type="submit">Checkout</Button>
							<SheetClose asChild>
								<Button variant="outline">Close</Button>
							</SheetClose>
						</SheetFooter>
					</>
				) : (
					<div className="flex justify-center text-zinc-500">
						No products in the cart
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
