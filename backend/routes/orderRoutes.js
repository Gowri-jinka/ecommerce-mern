import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    const { product, address, paymentMethod, userId } = req.body;

    const order = new Order({
      userId,   // ✅ ADDED
      product,
      address,
      paymentMethod
    });

    await order.save();

    res.json({ message: "Order saved", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL ORDERS (kept)
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// ✅ NEW → GET USER ORDERS
router.get("/user/:id", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;