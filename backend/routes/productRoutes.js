import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Add product
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Get products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;