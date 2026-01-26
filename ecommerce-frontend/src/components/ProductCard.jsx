import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ProductCard({ product }) {
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
		<Card className="overflow-hidden">
			<CardHeader className="flex justify-center bg-gray-100">
				<img src={product.thumbnail} />
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

			<CardFooter className="mt-auto ">
				<Button className="flex-1 text-md" variant="outline">
					Add to cart
				</Button>
			</CardFooter>
		</Card>
	);
}
