import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    const { product, address, paymentMethod } = req.body;

    const order = new Order({
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

// GET ALL ORDERS
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

export default router;