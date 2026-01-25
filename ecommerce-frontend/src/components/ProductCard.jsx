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
	const originalProductPrice =
		Math.trunc((product.price / (1 - product.discountPercentage / 100)) * 100) /
		100;
	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-gray-100">
				<img src={product.thumbnail} />
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex space-x-1">
					<Star className="text-[#008043] fill-[#008043]" />
					<p>
						{product.rating}({product.reviews.length})
					</p>
				</div>
				<CardTitle>{product.title}</CardTitle>
				<div className="flex flex-wrap space-x-3">
					<p className="font-semibold">${product.price}</p>
					<strike>${originalProductPrice}</strike>
					<Badge variant="success">{product.discountPercentage}% off</Badge>
				</div>
			</CardContent>
			<CardFooter className="mt-auto">
				<Button size="sm" variant="outline">
					Add to cart
				</Button>
			</CardFooter>
		</Card>
	);
}
