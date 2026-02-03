import z from "zod";

export const registerValidationSchema = z.object({
	name: z.string("Enter a name").min(2, "Minimum 2 characters required.").max(50, "Maximum 50 characters allowed."),
	email: z.email("Invalid email address."),
	password: z.string("Enter a password").min(6, "Minimum 6 characters required.").max(100, "Password too long.").regex(
			/^(?=.*[A-Za-z])(?=.*\d).+$/,
			"Password must contain at least one letter and one number."
		),
});

export const loginValidationSchema = z.object({
  email: z.email("Invalid email address."),
	password: z.string("Enter a password").min(6, "Minimum 6 characters required."),
})
