import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ setCategory }) {
  const [show, setShow] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef();
  const profileRef = useRef();

  const { cart } = useCart();
  const auth = useAuth() || {};
  const { user, logout } = auth;

  const navigate = useNavigate();
  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div style={{ ...navStyle, background: "var(--nav-bg)", color: "var(--nav-text)" }}>
      <Link to="/" style={logoStyle}>
        EdisonKart
      </Link>

      <div style={menu}>
        <Link to="/" onClick={() => setCategory("")} style={linkStyle}>
          Home
        </Link>

        <span onClick={() => navigate("/wishlist")} style={linkStyle}>
          ❤️ Wishlist
        </span>

        {/* 🔥 UPDATED SHOP DROPDOWN */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <span style={linkStyle} onClick={() => setShow(!show)}>
            Shop ▾
          </span>

          {show && (
            <div style={dropdown}>

              {/* 👕 FASHION */}
              <p style={sectionTitle}>Fashion</p>
              <p onClick={() => setCategory("men")}>Men</p>
              <p onClick={() => setCategory("women")}>Women</p>
              <p onClick={() => setCategory("kids")}>Kids</p>

              <hr />

              {/* 📱 ELECTRONICS */}
              <p style={sectionTitle}>Electronics</p>
              <p onClick={() => setCategory("mobiles")}>Mobiles</p>
              <p onClick={() => setCategory("laptops")}>Laptops</p>
              <p onClick={() => setCategory("headphones")}>Headphones</p>
              <p onClick={() => setCategory("smartwatches")}>Smartwatches</p>

              <hr />

              {/* 🏠 HOME */}
              <p style={sectionTitle}>Home & Living</p>
              <p onClick={() => setCategory("furniture")}>Furniture</p>
              <p onClick={() => setCategory("home-decor")}>Home Decor</p>
              <p onClick={() => setCategory("kitchen")}>Kitchen</p>
              <p onClick={() => setCategory("lighting")}>Lighting</p>

              <hr />

              {/* 💄 BEAUTY */}
              <p style={sectionTitle}>Beauty</p>
              <p onClick={() => setCategory("skincare")}>Skincare</p>
              <p onClick={() => setCategory("makeup")}>Makeup</p>
              <p onClick={() => setCategory("haircare")}>Haircare</p>

            </div>
          )}
        </div>

        <Link to="/cart" style={linkStyle}>
          Cart ({cart.length})
        </Link>

        {/* THEME BUTTON */}
        <button
          onClick={toggleTheme}
          style={{
            background: "var(--card-bg)",
            border: "none",
            padding: "6px 12px",
            borderRadius: "20px",
            cursor: "pointer"
          }}
        >
          🌙 | ☀️
        </button>

        {user ? (
          <div style={{ position: "relative" }} ref={profileRef}>
            <span
              style={{ color: "#0f0", cursor: "pointer" }}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              👤 {user.name}
            </span>

            {profileOpen && (
              <div style={profileDropdown}>
                <p onClick={() => navigate("/profile")}>My Profile</p>
                <p onClick={() => navigate("/cart")}>Cart</p>
                <p onClick={logout} style={{ color: "red" }}>
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}

/* 🔥 STYLES */

const sectionTitle = {
  fontWeight: "bold",
  marginTop: "8px"
};

const logoStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "20px"
};

const menu = {
  display: "flex",
  gap: "20px",
  alignItems: "center"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  cursor: "pointer"
};

const dropdown = {
  position: "absolute",
  top: "35px",
  left: 0,
  background: "#fff",
  color: "#000",
  padding: "10px",
  borderRadius: "6px",
  zIndex: 1000,
  minWidth: "180px", // 🔥 increased width
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
};

const profileDropdown = {
  position: "absolute",
  top: "30px",
  right: 0,
  background: "#fff",
  color: "#000",
  padding: "10px",
  borderRadius: "6px",
  width: "150px",
  zIndex: 1000,
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 40px",
  background: "var(--nav-bg)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
};