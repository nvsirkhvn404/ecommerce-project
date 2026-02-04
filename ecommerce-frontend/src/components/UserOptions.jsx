import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/useUser";
import { LogOutIcon } from "lucide-react";
import { Link } from "react-router";

export default function UserOptions() {
	const { data } = useUser();

	return (
		<>
			{data ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full">
							<Avatar>
								<AvatarImage src="https://ghub.com/shan.png" alt="shadcn" />
								<AvatarFallback>{data.name[0].toUpperCase()}</AvatarFallback>
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
				<Link to="/login">Login</Link>
			)}
		</>
	);
}
