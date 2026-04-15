import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ setCategory }) {
  const [show, setShow] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState("");

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

  const handleCategory = (cat) => {
    setCategory(cat);
    setActive(cat);
  };

  return (
    <>
      {/* 🔥 TOP NAVBAR */}
      <div style={navStyle}>
        <Link to="/" style={logoStyle}>
          EdisonKart
        </Link>

        <div style={menu}>
          <Link to="/" onClick={() => { setCategory(""); setActive(""); }} style={linkStyle}>
            Shopping
          </Link>

          <span onClick={() => navigate("/wishlist")} style={linkStyle}>
            ❤️ Wishlist
          </span>

          <div style={{ display: "none" }} ref={dropdownRef}>
            <span style={linkStyle} onClick={() => setShow(!show)}>
              Shop ▾
            </span>
          </div>

          <Link to="/cart" style={linkStyle}>
            Cart ({cart.length})
          </Link>

          <button onClick={toggleTheme} style={themeBtn}>
            🌙 | ☀️
          </button>

          {user ? (
            <div style={{ position: "relative" }} ref={profileRef}>
              <span style={userStyle} onClick={() => setProfileOpen(!profileOpen)}>
                👤 {user.name}
              </span>

              {profileOpen && (
                <div style={profileDropdown}>
                  <p onClick={() => navigate("/profile")}>My Profile</p>
                  <p onClick={() => navigate("/cart")}>Cart</p>
                  <p onClick={logout} style={{ color: "red" }}>Logout</p>
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

      {/* 🔥 ULTRA STYLED CATEGORY BAR */}
      <div style={categoryBar}>
        {[
          "men","women","kids","mobiles","laptops","headphones",
          "smartwatches","furniture","home-decor","kitchen",
          "lighting","skincare","makeup","haircare"
        ].map((cat) => (
          <span
            key={cat}
            onClick={() => handleCategory(cat)}
            style={{
              ...catItem,
              background: active === cat
                ? "linear-gradient(135deg,#ff3f6c,#ff8a00)"
                : "rgba(255,255,255,0.4)",
              color: active === cat ? "#fff" : "#333",
              boxShadow: active === cat
                ? "0 6px 20px rgba(255,63,108,0.5)"
                : "0 2px 8px rgba(0,0,0,0.1)",
              transform: active === cat ? "scale(1.1)" : "scale(1)"
            }}
            onMouseEnter={(e) => {
              if (active !== cat) {
                e.target.style.background = "linear-gradient(135deg,#ffe0ec,#fff4e0)";
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (active !== cat) {
                e.target.style.background = "rgba(255,255,255,0.4)";
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }
            }}
          >
            {cat.replace("-", " ").toUpperCase()}
          </span>
        ))}
      </div>
    </>
  );
}

/* 🔥 STYLES */

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 40px",
  background: "linear-gradient(135deg,#141e30,#243b55)",
  color: "#fff",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
};

const logoStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "22px",
  letterSpacing: "1px"
};

const menu = {
  display: "flex",
  gap: "20px",
  alignItems: "center"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  cursor: "pointer",
  fontWeight: "500"
};

const themeBtn = {
  background: "rgba(255,255,255,0.2)",
  border: "none",
  padding: "6px 12px",
  borderRadius: "20px",
  cursor: "pointer",
  color: "#fff"
};

const userStyle = {
  color: "#00ffcc",
  cursor: "pointer",
  fontWeight: "bold"
};

const profileDropdown = {
  position: "absolute",
  top: "30px",
  right: 0,
  background: "#fff",
  color: "#000",
  padding: "10px",
  borderRadius: "10px",
  width: "150px",
  zIndex: 1000,
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
};

const categoryBar = {
  display: "flex",
  gap: "20px",
  padding: "15px 25px",
  background: "linear-gradient(90deg,#ffe6ee,#fff3e6)",
  overflowX: "auto",
  position: "sticky",
  top: "0",
  zIndex: 999,
  backdropFilter: "blur(15px)"
};

const catItem = {
  padding: "8px 16px",
  borderRadius: "25px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  whiteSpace: "nowrap"
};