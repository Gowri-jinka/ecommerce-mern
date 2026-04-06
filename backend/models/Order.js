import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: String, // or userId later
  product: Object,
  address: String,
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: Date.now     //which can store automatically uree time and date
  }
});

export default mongoose.model("Order", orderSchema);
