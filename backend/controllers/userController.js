import User from "../models/User.js";
import bcrypt from "bcrypt";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.log("GET PROFILE ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


//  UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, email, password, phone, address, profilePic } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // BASIC FIELDS
    if (name) user.name = name;
    if (email) user.email = email;

    //  PASSWORD UPDATE
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    //  EXTRA FIELDS
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (profilePic) user.profilePic = profilePic;

    await user.save();

    res.json({
      msg: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profilePic: user.profilePic
      }
    });

  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};


//////////////////////////////////////////////////////////////////
// ⭐ WISHLIST FEATURES
//////////////////////////////////////////////////////////////////

// ⭐ ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // prevent duplicate
    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId);
    }

    await user.save();

    res.json({
      msg: "Added to wishlist",
      wishlist: user.wishlist
    });

  } catch (error) {
    console.log("ADD WISHLIST ERROR:", error);
    res.status(500).json({ msg: "Error adding to wishlist" });
  }
};


// ⭐ GET WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");

    res.json(user.wishlist);

  } catch (error) {
    console.log("GET WISHLIST ERROR:", error);
    res.status(500).json({ msg: "Error fetching wishlist" });
  }
};


// ⭐ REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId
    );

    await user.save();

    res.json({ msg: "Removed from wishlist" });

  } catch (error) {
    console.log("REMOVE WISHLIST ERROR:", error);
    res.status(500).json({ msg: "Error removing from wishlist" });
  }
};