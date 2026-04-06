import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import API from "../api/axios";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);

  const [liked, setLiked] = useState(false);

  const handleWishlist = async (e, id) => {
    e.stopPropagation();

    try {
      await API.post(`/user/wishlist/${id}`);
      setLiked(true); // ✅ UI feedback
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      style={cardStyle}
    >
      <img
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.name}
        style={imgStyle}
      />

      <div style={{ padding: "12px" }}>
        <h4>{product.name}</h4>

        <p style={categoryStyle}>{product.category}</p>

        <p style={descStyle}>{product.description}</p>

        <h3 style={{ color: "green" }}>₹{product.price}</h3>

        <div style={btnContainer}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            style={btnOrange}
          >
            Add to Cart
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/checkout", { state: { product } });
            }}
            style={btnBlack}
          >
            Buy Now
          </button>
        </div>

        <button
          onClick={(e) => handleWishlist(e, product._id)}
          style={{
            ...btnWish,
            background: liked ? "green" : "#e91e63"
          }}
        >
          {liked ? "❤️ Added" : "🤍 Wishlist"}
        </button>
      </div>
    </div>
  );
}

/* STYLES */

const cardStyle = {
  borderRadius: "16px",
  overflow: "hidden",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  cursor: "pointer",
  width: "230px",
  transition: "all 0.3s ease"
};

const imgStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover"
};

const categoryStyle = {
  fontSize: "12px",
  color: "#777"
};

const descStyle = {
  fontSize: "13px",
  color: "#555"
};

const btnContainer = {
  display: "flex",
  gap: "10px",
  marginTop: "10px"
};

const btnOrange = {
  flex: 1,
  padding: "8px",
  background: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.2s"
};

const btnBlack = {
  flex: 1,
  padding: "8px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.2s"
};

const btnWish = {
  width: "100%",
  marginTop: "10px",
  padding: "8px",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.2s"
};