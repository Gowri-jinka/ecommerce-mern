import express from "express";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import Razorpay from "razorpay";
import crypto from "crypto"; // ✅ ADDED

dotenv.config();

const router = express.Router();

// DEBUG (REMOVE LATER)
console.log("RAZOR KEY:", process.env.RAZORPAY_KEY);

// RAZORPAY INIT
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// CREATE RAZORPAY ORDER
router.post("/razorpay-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
    });

    res.json(order);
  } catch (err) {
    console.error("Razorpay Error:", err);
    res.status(500).json(err);
  }
});

// ✅ VERIFY PAYMENT (NEW)
router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    product,
    address,
    userId
  } = req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      // ✅ Payment is valid → save order
      const order = new Order({
        userId,
        product,
        address,
        paymentMethod: "online"
      });

      await order.save();

      res.json({ success: true });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json(err);
  }
});

// ✅ CREATE ORDER (UNCHANGED)
router.post("/create", async (req, res) => {
  try {
    const { product, address, paymentMethod, userId } = req.body;

    const order = new Order({
      userId,
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

// ✅ GET ALL ORDERS (UNCHANGED)
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// ✅ GET USER ORDERS (UNCHANGED)
router.get("/user/:id", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;