import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ setCategory }) {
  const [show, setShow] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef();
  const profileRef = useRef();

  const { cart } = useCart();
  const auth = useAuth() || {};
  const { user, logout } = auth;

  const navigate = useNavigate();

  // 🔥 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShow(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div style={navStyle}>
      {/* LOGO */}
      <Link to="/" style={logoStyle}>
        EdisonKart
      </Link>

      <div style={menu}>
        {/* HOME */}
        <Link to="/" onClick={() => setCategory("")} style={linkStyle}>
          Home
        </Link>

        {/* WISHLIST */}
        <span onClick={() => navigate("/wishlist")} style={linkStyle}>
          ❤️ Wishlist
        </span>

        {/* SHOP DROPDOWN */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <span
            style={linkStyle}
            onClick={() => setShow(!show)}
          >
            Shop ▾
          </span>

          {show && (
            <div style={dropdown}>
              <p onClick={() => setCategory("men")}>Men</p>
              <p onClick={() => setCategory("women")}>Women</p>
              <p onClick={() => setCategory("kids")}>Kids</p>
            </div>
          )}
        </div>

        {/* CART */}
        <Link to="/cart" style={linkStyle}>
          Cart ({cart.length})
        </Link>

        {/* PROFILE */}
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

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "#111",
  color: "#fff"
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
  minWidth: "120px",
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