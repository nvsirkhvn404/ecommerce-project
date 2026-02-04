import { Link } from "react-router";
import { Cart } from "./Cart";
import ThemeToggle from "./ui/ThemeToggle";
import UserOptions from "./UserOptions";

export default function Navbar() {
	
	return (
		<div className=" flex flex-col items-center fixed top-5 inset-x-0 z-50">
			<nav className="flex items-center py-4 px-10 w-full max-w-3xl justify-between border rounded-full bg-background/70 backdrop-blur-2xl">
				<Link to="/">Sahara</Link>
				<div className="flex justify-between items-center gap-5">
					<ThemeToggle />
					<Cart />
					<UserOptions />
				</div>
			</nav>
		</div>
	);
}
