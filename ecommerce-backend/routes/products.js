import { Router } from "express";
import Product from "../models/Product.js";

const router = Router()

router.get("/", async (req, res) => {
	try {
		const query = req.query.q || "";
		const sortOrder = req.query.sort === "desc" ? -1 : 1;
		const sortField = req.query.sortField || "rating";
		const limit = Number(req.query.limit) || 24;
		const page = Number(req.query.page) || 1;
		const skip = (page - 1) * limit;

		const filter = {
			title: { $regex: query, $options: "i" },
		};

		const total = await Product.countDocuments(filter);

		const products = await Product.find(filter)
			.sort({ [sortField]: sortOrder })
			.skip(skip)
			.limit(limit);

		const hasNextPage = skip + products.length < total;

		res.json({
			data: products,
			currentPage: page,
			totalPages: Math.ceil(total / limit),
			hasNextPage,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;