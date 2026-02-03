import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useLocalCart from "@/store";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import QuantityControl from "./QuantityControl";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ProductCard({ product }) {
	const [imgLoaded, setImgLoaded] = useState(false);
	const { cart, cartFn } = useLocalCart();
	const currentCart = cart.find((item) => item.product.id === product.id);

	const RATING_COLOR =
		product.rating > 3.5
			? "text-green-600 fill-green-600"
			: product.rating > 2.5
				? "text-yellow-500 fill-yellow-500"
				: "text-red-600 fill-red-600";

	const originalProductPrice =
		Math.trunc((product.price / (1 - product.discountPercentage / 100)) * 100) /
		100;

	return (
		<motion.div
			layoutId={product._id} 
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
		>
			<Card className="overflow-hidden">
				<CardHeader className="flex justify-center bg-background min-h-40 overflow-hidden">
					<motion.img
						src={product.thumbnail}
						onLoad={() => setImgLoaded(true)}
						initial={{ opacity: 0, y: 20 }}
						animate={imgLoaded ? { opacity: 1, y: 0 } : { opacity: 0 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
					/>
				</CardHeader>

				<CardContent className="space-y-3">
					<div className="flex space-x-1">
						<Star className={RATING_COLOR} />
						<p>
							{product.rating}({product.reviews.length})
						</p>
					</div>
					<CardTitle>{product.title}</CardTitle>
					<div className="flex flex-wrap items-center space-x-3">
						<p className="font-semibold">${product.price}</p>
						<strike className="text-xs">${originalProductPrice}</strike>
						<Badge variant="success">{product.discountPercentage}% off</Badge>
					</div>
				</CardContent>

				<CardFooter className="mt-auto flex justify-center">
					<AnimatePresence mode="wait">
						{currentCart ? (
							<motion.div
								key="qty"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.09 }}
							>
								<QuantityControl
									quantity={currentCart.quantity}
									stock={currentCart.product.stock}
									onAdd={() => cartFn(product, "ADD")}
									onSubtract={() => cartFn(product, "SUBTRACT")}
								/>
							</motion.div>
						) : (
							<motion.div
								key="btn"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.09 }}
								className="flex-1"
							>
								<Button
									className="w-full text-md"
									variant="outline"
									onClick={() => cartFn(product, "ADD")}
								>
									Add to cart
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
