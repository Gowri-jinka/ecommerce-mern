import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // ✅ IMPORT AXIOS
import qrImage from "../assets/qr.png";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false); // optional but important

  if (!product) return <h2>No product selected</h2>;

  // ✅ UPDATED FUNCTION
  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Enter address");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5002/api/orders/create",
        {
          product,
          address,
          paymentMethod,
        }
      );

      console.log("Order saved:", response.data);

      // ✅ Navigate after success
      navigate("/success", {
        state: { product, address, paymentMethod },
      });

    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Checkout</h2>

      {/* PRODUCT */}
      <img src={product.image} width="200" alt="product" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      {/* ADDRESS */}
      <h4>Delivery Address</h4>
      <input
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      {/* PAYMENT */}
      <h4>Payment Method</h4>

      <label>
        <input
          type="radio"
          checked={paymentMethod === "cod"}
          onChange={() => setPaymentMethod("cod")}
        />
        Cash on Delivery
      </label>

      <br />

      <label>
        <input
          type="radio"
          checked={paymentMethod === "upi"}
          onChange={() => setPaymentMethod("upi")}
        />
        UPI
      </label>

      <br />
      <br />

      {/* 🔥 UPI QR SECTION */}
      {paymentMethod === "upi" && (
        <div
          style={{
            border: "2px solid #ff3f6c",
            padding: "20px",
            borderRadius: "12px",
            background: "#fff",
            maxWidth: "300px",
            textAlign: "center",
          }}
        >
          <h4>Scan & Pay</h4>

          <img
            src={qrImage}
            alt="QR Code"
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
          />

          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            Scan using PhonePe / GPay / Paytm
          </p>
        </div>
      )}

      <br />

      {/* BUTTON */}
      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: loading ? "#555" : "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}