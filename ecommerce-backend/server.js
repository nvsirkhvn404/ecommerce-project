import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

app.get("/", async (req, res) => {
	res.send({ message: "Hi" });
});

app.get("/api/products", async (req, res) => {
	try {
		const query = req.query.q || "";
		const sortOrder = req.query.sort === "desc" ? -1 : 1;
		const limit = Number(req.query.limit) || 32;
		const page = Number(req.query.page) || 1;
		const skip = (page - 1) * limit;

		const products = await Product.find({
			title: { $regex: query, $options: "i" },
		})
			.sort({ title: sortOrder })
			.skip(skip)
			.limit(limit);

		return res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`),
);
