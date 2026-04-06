import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/mailer.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

//  Send Email
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"EdisonKart" <test@test.com>',
      to,
      subject,
      html
    });

    console.log("EMAIL SENT:", subject);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

  } catch (err) {
    console.log("Email Error:", err.message);
  }
};

// 🔐 REGISTER + SEND OTP
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      isVerified: false
    });

    await sendEmail(
      email,
      "Verify your account - EdisonKart",
      `<h2>Your OTP: ${otp}</h2><p>Valid for 5 minutes</p>`
    );

    res.json({ msg: "Registered. OTP sent to email." });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// 🔐 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid email" });

    if (!user.isVerified) {
      return res.status(400).json({ msg: "Verify OTP first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// 🔐 RESEND OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("RESEND OTP HIT:", email); // ✅ DEBUG

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Resend OTP - EdisonKart",
      `<h2>Your OTP: ${otp}</h2>`
    );

    res.json({ msg: "OTP resent" });

  } catch (error) {
    console.log("RESEND ERROR:", error); // ✅ DEBUG
    res.status(500).json({ msg: "Error resending OTP" });
  }
};

// 🔐 VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    // ✅ FIXED TYPE ISSUE
    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ msg: "Account verified" });

  } catch (error) {
    console.log("VERIFY ERROR:", error); // ✅ DEBUG
    res.status(500).json({ msg: "Error verifying OTP" });
  }
};

// 🔐 FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await sendEmail(
      email,
      "Reset Password",
      `<a href="${resetLink}">Reset Password</a>`
    );

    res.json({ msg: "Reset link sent" });

  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// 🔐 RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.json({ msg: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};