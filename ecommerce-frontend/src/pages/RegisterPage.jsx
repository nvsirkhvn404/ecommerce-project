import FormError from "@/components/FormErrorMessage";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerValidationSchema } from "@/validation/authValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function RegisterPage() {
	const [serverError, setServerError] = useState(null);
	const {
		register,
		handleSubmit,
		watch,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(registerValidationSchema) });

	useEffect(() => {
		setServerError(null);
	}, [watch("email"), watch("name"), watch("password")]);

	const onSubmit = async (data) => {
		try {
			const { user, token } = await axios
				.post("http://localhost:3000/api/auth/register", data)
				.then((res) => res.data);

			localStorage.setItem("user", JSON.stringify({ user, token }));
			window.location.href = "/";
		} catch (err) {
			console.log(err);

			setServerError(err?.response?.data?.message || "Registration failed");
		}
	};

	return (
		<div className=" flex items-center justify-center px-5">
			<Card className="w-full max-w-md shadow-lg p-5 sm:p-10 gap-5">
				<CardHeader className="text-center">
					<h1 className="text-3xl font-bold">Register</h1>
					<p>Create a new account</p>
				</CardHeader>

				<CardContent>
					<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
						<FormError
							error={serverError}
							errorMessage={serverError}
							errorClearFn={() => setServerError(null)}
						/>
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="text"
								placeholder="Your name"
								autoFocus
								{...register("name")}
							/>

							<FormError
								error={errors.name}
								errorMessage={errors.name?.message}
								errorClearFn={() => clearErrors("name")}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								{...register("email")}
							/>

							<FormError
								error={errors.email}
								errorMessage={errors.email?.message}
								errorClearFn={() => clearErrors("email")}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••"
								{...register("password")}
							/>

							<FormError
								error={errors.password}
								errorMessage={errors.password?.message}
								errorClearFn={() => clearErrors("password")}
							/>
						</div>

						<Button className="w-full" disabled={isSubmitting} type="submit">
							{isSubmitting ? "Registering" : "Register"}
						</Button>
					</form>
				</CardContent>

				<CardFooter className="justify-center text-sm text-muted-foreground gap-2">
					Already have an account?
					<Link to="/login" className="underline">
						Sign in
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
