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
import { Badge } from "./ui/badge";

export function Cart({ cart, cartStorageFn }) {
	let subtotal = 0;
	let totalQuantity = 0;
	cart.forEach((item) => {
		subtotal += item.product.price * item.quantity;
		totalQuantity += item.quantity;
	});
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">
					Cart {totalQuantity ? <Badge className="rounded-full">{totalQuantity}</Badge> : ""} 
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
						<div className="overflow-y-auto  px-2">
							{cart.map((item, index) => (
								<div
									key={index}
									className="flex flex-col sm:flex-row justify-between sm:items-center py-2 gap-2 border-b"
								>
									<div className="flex items-center gap-2">
										<img src={item.product.thumbnail} className="h-20" />
										<div>
											<p className="font-semibold">{item.product.title}</p>
											<div className="flex flex-col sm:flex-row space-x-2">
												<p className="font-semibold">${item.product.price}</p>
												<p>Quantity: {item.quantity}</p>
											</div>
										</div>
									</div>
									<div className="flex  gap-2">
										<Button
											size="sm"
											variant="destructive"
											onClick={() => cartStorageFn(item.product, 1, "subtract")}
										>
											-
										</Button>
										<Button
											size="sm"
											variant="outline"
											onClick={() => cartStorageFn(item.product, 1, "add")}
										>
											+
										</Button>
									</div>
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
