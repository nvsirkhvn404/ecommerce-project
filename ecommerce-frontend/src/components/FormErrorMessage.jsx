import { X } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "motion/react";

export default function FormError({ error, errorMessage, errorClearFn }) {
	return (
		<AnimatePresence>
			{error && (
				<motion.div
					key="form-error"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					className="flex justify-between items-center px-2 py-1 bg-red-100 text-red-700 border border-red-700 shadow-md rounded-lg text-sm"
				>
					<p>{errorMessage}</p>
					<Button
						onClick={errorClearFn}
						variant="ghost"
						size="xs"
						type="button"
						className="hover:bg-red-400 hover:text-accent-foreground dark:hover:bg-red-700/50"
					>
						<X />
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
