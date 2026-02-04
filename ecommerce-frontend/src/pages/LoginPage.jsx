import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginValidationSchema } from "@/validation/authValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function LoginPage() {
	const [serverError, setServerError] = useState(null);
	const {
		register,
		handleSubmit,
		watch,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(loginValidationSchema) });

	useEffect(() => {
		setServerError(null);
	}, [watch("email"), watch("password")]);

	const onSubmit = async (data) => {
		try {
			const { user, token } = await axios
				.post("http://localhost:3000/api/auth/login", data)
				.then((res) => res.data);

			localStorage.setItem("user", JSON.stringify({ user, token }));
			window.location.href = "/";
		} catch (err) {
			console.log(err);
			setServerError(err?.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className=" flex items-center justify-center px-5">
			<Card className="w-full max-w-md shadow-lg p-5 sm:p-10 gap-5">
				<CardHeader className="text-center">
					<h1 className="text-3xl font-bold">Welcome Back</h1>
					<p>Login to your account</p>
				</CardHeader>

				<CardContent>
					<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
						{serverError && (
							<div className="flex justify-between items-center px-2 py-1 bg-red-400 text-red-600 border border-red-600 rounded-lg text-sm">
								<p>{serverError}</p>
								<Button
									onClick={() => setServerError(null)}
									variant="ghost"
									size="xs"
									type="button"
								>
									<X />
								</Button>
							</div>
						)}
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								{...register("email")}
							/>

							{errors.email && (
								<div className="flex justify-between items-center px-2 py-1 bg-red-400 text-red-600 border border-red-600 rounded-lg text-sm">
									<p>{errors.email?.message}</p>
									<Button
										onClick={() => clearErrors("email")}
										variant="ghost"
										size="xs"
										type="button"
									>
										<X />
									</Button>
								</div>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••"
								{...register("password")}
							/>

							{errors.password && (
								<div className="flex justify-between items-center px-2 py-1 bg-red-400 text-red-600 border border-red-600 rounded-lg text-sm">
									<p>{errors.password?.message}</p>
									<Button
										onClick={() => clearErrors("password")}
										variant="ghost"
										size="xs"
										type="button"
									>
										<X />
									</Button>
								</div>
							)}
						</div>

						<Button className="w-full" disabled={isSubmitting} type="submit">
							{isSubmitting ? "Logging in" : "Login"}
						</Button>
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
