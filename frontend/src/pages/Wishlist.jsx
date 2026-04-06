import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/AppContext";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  // 🔥 FETCH WISHLIST
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/users/wishlist");
      setWishlist(res.data);
    } catch (err) {
      alert("Failed to load wishlist");
    }
  };

  // ❌ REMOVE FROM WISHLIST
  const removeFromWishlist = async (id) => {
    try {
      await API.delete(`/users/wishlist/${id}`);
      fetchWishlist();
    } catch (err) {
      alert("Error removing item");
    }
  };

  // 🛒 MOVE TO CART
  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product._id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{
  textAlign: "center",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "28px",
  marginBottom: "20px"
}}>
  ❤️ My Wishlist
</h2>

      {wishlist.length === 0 ? (
        <p style={{ textAlign: "center" }}>No items in wishlist</p>
      ) : (
        wishlist.map((item) => (
          <div key={item._id} style={card}>
            <img src={item.image} style={img} />

            <div style={{ flex: 1 }}>
              <h3 style={{ color: "#fff", margin: "5px 0" }}>
  {item.name}
</h3>

<p style={{ color: "#ddd", margin: "5px 0" }}>
  {item.description}
</p>

<h4 style={{ color: "#00ff88", margin: "5px 0" }}>
  ₹{item.price}
</h4>

              <button onClick={() => moveToCart(item)} style={btnGreen}>
                Move to Cart
              </button>

              <button
                onClick={() => removeFromWishlist(item._id)}
                style={btnRed}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const card = {
  display: "flex",
  gap: "20px",
  padding: "20px",
  marginBottom: "20px",
  alignItems: "center",

  background: "rgba(0,0,0,0.6)",   // 🔥 dark glass
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.2)"
};

const img = {
  width: "100px",
  height: "100px",
  objectFit: "cover"
};

const btnGreen = {
  marginRight: "10px",
  padding: "10px 14px",
  background: "#00c853",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const btnRed = {
  padding: "10px 14px",
  background: "#ff1744",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};