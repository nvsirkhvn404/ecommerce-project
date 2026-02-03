import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({ message: "Provide proper credentials" });

	const user = await User.findOne({ email });
	if (!user) return res.status(200).json({ message: "Bad Credentials E" });

	const isValid = bcrypt.compareSync(password, user.password);
	if (!isValid) return res.status(200).json({ message: "Bad Credentials P" });

	return res.send(user);
});

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password)
		return res.status(400).json({ message: "Provide proper credentials" });

	const user = await User.findOne({ email: email });
	if (user) return res.status(409).json({ message: "User Already exists" });

	const hashedPassword = bcrypt.hashSync(password, 10);
	const newUser = await User.create({ name, email, password: hashedPassword });

	return res.status(200).json(newUser);
});

export default router;
