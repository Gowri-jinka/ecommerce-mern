import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,

  highlights: {
    color: String,
    fabric: String,
    fit: String,
    length: String
  }
});

export default mongoose.model("Product", productSchema);