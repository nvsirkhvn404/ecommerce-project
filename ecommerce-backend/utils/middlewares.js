import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const validateBody = (schema) => (req, res, next) => {
	const result = schema.safeParse(req.body);
	if (!result.success)
		return res.status(400).json({
			message: "Validation failed",
			error: result.error.format(),
		});

	req.body = result.data;
	next();
};

export const requireAuth = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader)
			return res.status(401).json({ message: "Authorization header missing" });

		const [scheme, token] = authHeader.split(" ");
		if (scheme !== "Bearer" || !token)
			return res.status(401).json({ message: "Invalid authorization format" });

		const decode = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decode.id).select("-password");
		if (!user) return res.status(401).json({ message: "User not found" });
		req.user = user;

		next();
	} catch (err) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}
};
