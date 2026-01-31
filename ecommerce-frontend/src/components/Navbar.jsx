import { Link } from "react-router";
import { Cart } from "./Cart";
import ThemeToggle from "./ui/ThemeToggle";

export default function Navbar() {
	return (
		<div className="flex justify-between items-center px-10 py-5 border">
			<Link to="/">Sahara</Link>
			<div className="flex justify-between items-center gap-5">
				<ThemeToggle />
				<Cart />
			</div>
		</div>
	);
}
