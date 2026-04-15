import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!product) return <h2>No product selected</h2>;

  // 🔥 UPDATED DELIVERY LOGIC (SMART)
  const deliveryCharge =
    product.price >= 1000
      ? 0
      : (product.deliveryCharge ?? 50); // fallback

  const totalPrice = product.price + deliveryCharge;

  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Enter address");
      return;
    }

    setLoading(true);

    try {
      // COD
      if (paymentMethod === "cod") {
        await axios.post(
          "http://localhost:5002/api/orders/create",
          {
            product,
            address,
            paymentMethod,
            userId: user?._id
          }
        );

        navigate("/success", {
          state: { product, address, paymentMethod },
        });

        return;
      }

      // ONLINE PAYMENT
      const { data } = await axios.post(
        "http://localhost:5002/api/orders/razorpay-order",
        { amount: totalPrice }
      );

      const options = {
        key: "rzp_test_SdHPxLvL4yibXG",
        amount: data.amount,
        currency: "INR",
        name: "EdisonKart",
        description: product.name,
        order_id: data.id,

        handler: async function () {
          await axios.post(
            "http://localhost:5002/api/orders/create",
            {
              product,
              address,
              paymentMethod: "online",
              userId: user?._id
            }
          );

          navigate("/success", {
            state: { product, address, paymentMethod: "online" },
          });
        },

        theme: {
          color: "#ff3f6c",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2>Checkout</h2>

      {/* PRODUCT */}
      <img src={product.image} width="150" alt="product" />
      <h3>{product.name}</h3>

      {/* 🔥 ORDER SUMMARY */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
      }}>
        <h3>Order Summary</h3>

        <p>Price: ₹{product.price}</p>

        <p>
          Delivery:{" "}
          {deliveryCharge === 0 ? (
            <span style={{ color: "green" }}>FREE</span>
          ) : (
            `₹${deliveryCharge}`
          )}
        </p>

        {/* 🔥 EXTRA UX (nice touch) */}
        {deliveryCharge === 0 && (
          <p style={{ color: "green", fontSize: "13px" }}>
            🎉 Free delivery applied (above ₹1000)
          </p>
        )}

        <hr />

        <h3>Total: ₹{totalPrice}</h3>
      </div>

      {/* ADDRESS */}
      <h4 style={{ marginTop: "20px" }}>Delivery Address</h4>
      <input
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc"
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
          checked={paymentMethod === "online"}
          onChange={() => setPaymentMethod("online")}
        />
        Pay Online (Card / UPI / NetBanking)
      </label>

      <br /><br />

      {/* BUTTON */}
      <button
        onClick={handlePlaceOrder}
        disabled={!address || loading}
        style={{
          width: "100%",
          padding: "15px",
          background: (!address || loading) ? "#ccc" : "#ff3f6c",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: (!address || loading) ? "not-allowed" : "pointer",
          fontSize: "16px",
          fontWeight: "bold"
        }}
      >
        {loading
          ? "Processing Payment..."
          : `Confirm & Pay ₹${totalPrice}`}
      </button>
    </div>
  );
}