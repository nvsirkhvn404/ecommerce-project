import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
	return (
		<div className=" flex items-center justify-center px-5">
			<Card className="w-full max-w-md shadow-lg p-5 sm:p-10 gap-5">
				<CardHeader className="text-center">
					<h1 className="text-3xl font-bold">Welcome Back</h1>
					<p>Login to your account</p>
				</CardHeader>

				<CardContent>
					<form className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="you@example.com" required autoFocus />
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" placeholder="••••••" required  minimum="6" maximum="50"/>
						</div>

						<Button className="w-full">Login</Button>
					</form>
				</CardContent>

				<p className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link to="/register" className="underline">
						Sign up
					</Link>
				</p>
			</Card>
		</div>
	);
}
