import { useCart } from "../context/AppContext";

export default function Cart() {
  const {
    cart = [],
    removeFromCart = () => {},
    increaseQty = () => {},
    decreaseQty = () => {},
    totalPrice = 0
  } = useCart() || {};

  return (
    <div style={{ padding: "30px", position: "relative", zIndex: 1 }}>

      {/* TITLE */}
      <h2 style={{
        color: "#fff",
        textAlign: "center",
        marginBottom: "20px"
      }}>
        🛒 Your Cart
      </h2>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <h3 style={{ color: "#fff", textAlign: "center" }}>
          🛒 Cart is empty
        </h3>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} style={card}>

              {/* IMAGE */}
              <img src={item.image} alt={item.name} style={img} />

              {/* DETAILS */}
              <div style={{ flex: 1 }}>

                <h3 style={{ color: "#fff" }}>
                  {item.name}
                </h3>

                <p style={{ color: "#00ff88", fontWeight: "bold" }}>
                  ₹{item.price}
                </p>

                {/* QUANTITY */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    onClick={() => decreaseQty(item._id)}
                    style={qtyBtn}
                  >
                    -
                  </button>

                  <span style={{ color: "#fff" }}>
                    {item.qty}
                  </span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    style={qtyBtn}
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={removeBtn}
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

          {/* TOTAL */}
          <h2 style={{
            color: "#fff",
            marginTop: "20px",
            textAlign: "right"
          }}>
            Total: <span style={{ color: "#00ff88" }}>₹{totalPrice}</span>
          </h2>

        </>
      )}
    </div>
  );
}

/* STYLES */

const card = {
  display: "flex",
  gap: "20px",
  padding: "20px",
  margin: "20px 0",
  alignItems: "center",
  background: "rgba(0,0,0,0.65)",
  backdropFilter: "blur(12px)",
  borderRadius: "15px",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
};

const img = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "10px"
};

const removeBtn = {
  marginTop: "10px",
  background: "#ff1744",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

const qtyBtn = {
  padding: "5px 10px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};