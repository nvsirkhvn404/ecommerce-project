import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.js";
import ProductsRouter from "./routes/products.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductsRouter);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.send({ message: "Hi" });
});

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`),
);
