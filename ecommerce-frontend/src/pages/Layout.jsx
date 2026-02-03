import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

export default function Layout() {
	return (
		<div className="flex flex-col gap-5">
			<Navbar />
			<div className="pt-30">
				<Outlet />
			</div>
		</div>
	);
}
