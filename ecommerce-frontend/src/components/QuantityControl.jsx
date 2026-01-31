import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export default function QuantityControl({ quantity, stock, onAdd, onSubtract  }) {
	return (
		<div className="flex justify-center gap-5 items-center w-full select-none">
			<motion.div
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.05 }}
			>
				<Button
					size="sm"
					variant="destructive"
					onClick={onSubtract}
				>
					<Minus />
				</Button>
			</motion.div>

			<motion.p
				key={quantity}
				className="font-semibold text-lg text-center w-10"
				initial={{ scale: 0.7, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.7, opacity: 0 }}
				transition={{ duration: 0.15 }}
			>
				{quantity}
			</motion.p>

			<motion.div
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.05 }}
			>
				<Button
					size="sm"
					disabled={stock === quantity}
					onClick={onAdd}
				>
					<Plus />
				</Button>
			</motion.div>
		</div>
	);
}
