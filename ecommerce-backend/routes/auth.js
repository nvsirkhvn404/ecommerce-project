import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { validateBody } from "../utils/middlewares.js";
import {
	loginValidationSchema,
	registerValidationSchema,
} from "../utils/authValidationSchemas.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", validateBody(loginValidationSchema), async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: "Bad Credentials E" });

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) return res.status(401).json({ message: "Bad Credentials P" });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		user.password = undefined;

		return res.json({
			message: "Login successful",
			token,
			user,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Server error" });
	}
});

router.post(
	"/register",
	validateBody(registerValidationSchema),
	async (req, res) => {
		try {
			const { name, email, password } = req.body;

			const exists = await User.findOne({ email: email });
			if (exists) return res.status(409).json({ message: "User Already exists" });

			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await User.create({
				name,
				email,
				password: hashedPassword,
			});

			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "7d",
			});
			user.password = undefined;

			return res
				.status(201)
				.json({ message: "Registration Successful", token, user });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Server error" });
		}
	},
);

export default router;
