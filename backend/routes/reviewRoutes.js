import express from "express";
import Review from "../models/Review.js";
import { protect } from "../middleware/authMiddleware.js";
import mongoose from "mongoose"; // ✅ ADDED (fix for aggregate)

const router = express.Router();

// Add Review
router.post("/", protect, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // PREVENT DUPLICATE REVIEWS
    const existing = await Review.findOne({
      productId,
      userId: req.user.id
    });

    if (existing) {
      return res.status(400).json({ msg: "You already reviewed this product" });
    }

    const review = new Review({
      productId,
      userId: req.user.id,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to add review" });
  }
});

// Get Reviews
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate("userId", "name");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching reviews" });
  }
});

// Average Rating
router.get("/avg/:productId", async (req, res) => {
  try {
    const result = await Review.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(req.params.productId) }}, // ✅ FIXED
      { $group: { _id: null, avg: { $avg: "$rating" }}}
    ]);

    res.json({ avg: result[0]?.avg || 0 });

  } catch (err) {
    res.status(500).json({ msg: "Error calculating average" });
  }
});

export default router;