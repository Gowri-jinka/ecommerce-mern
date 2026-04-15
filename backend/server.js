process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { createTransporter } from "./config/mailer.js";

dotenv.config();
connectDB();

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API WORKING ✅");
});

// ✅ ROUTES
app.use("/api/reviews", reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/users", userRoutes); // kept
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// 🔥 VERY IMPORTANT LINE (ADD HERE)
await createTransporter();

// ✅ SERVER START
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});