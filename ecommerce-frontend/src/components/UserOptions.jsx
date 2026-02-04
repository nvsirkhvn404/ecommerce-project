import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { Link } from "react-router";

export default function UserOptions() {
	const auth = JSON.parse(localStorage.getItem("user"));

	return (
		<>
			{auth ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full">
							<Avatar>
								<AvatarImage src="https://ghub.com/shan.png" alt="shadcn" />
								<AvatarFallback>
									{auth.user.name[0].toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Link to="/profile" className="w-full">
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								localStorage.removeItem("user");
								window.location.reload();
							}}
						>
							<LogOutIcon />
							Sign Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<div className="flex gap-2">
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
			)}
		</>
	);
}
