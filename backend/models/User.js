import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  // PROFILE FIELDS
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },

  // WISHLIST 
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],

  //  OTP
  otp: String,
  otpExpiry: Date,

  isVerified: {
    type: Boolean,
    default: false
  },

  // RESET PASSWORD
  resetToken: String,
  resetTokenExpiry: Date

}, { timestamps: true });

export default mongoose.model("User", userSchema);