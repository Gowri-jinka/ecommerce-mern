import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: String, // kept
  product: Object,
  address: String,
  paymentMethod: String,

  status: {               // ✅ ADDED
    type: String,
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);