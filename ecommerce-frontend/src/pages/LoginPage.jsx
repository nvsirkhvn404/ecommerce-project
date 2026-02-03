import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

export default function LoginPage() {
	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col gap-5 items-center w-full max-w-3xl border rounded-2xl p-10">
				<h1>Login</h1>
				<form className="flex flex-col gap-5">
					<div className="flex gap-5">
						<div className="flex flex-col flex-1 gap-2">
							<Label htmlFor="name">Username: </Label>
							<Input id="name" />
						</div>
						<div className="flex flex-col flex-1 gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" />
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="password">Password:</Label>
						<Input id="password" />
					</div>
					<Button>Login</Button>
				</form>
				<p>
					Don't Have an Account?{" "}
					<Link to="/">
						<Button variant="link">SignUp</Button>
					</Link>
				</p>
			</div>
		</div>
	);
}
