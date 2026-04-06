import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();     //router creation

// Add to cart
router.post("/", async (req, res) => {            //function runs when api calls
  const item = await Cart.create(req.body);
  res.json(item);
});

// Get cart
router.get("/:userId", async (req, res) => {
  const items = await Cart.find({ userId: req.params.userId });      //fetches the multiple items 
  res.json(items);
});

// Delete item
router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json("Item removed");
});

export default router;