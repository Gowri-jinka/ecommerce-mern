import { useLocation } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();

  if (!state) return <h2>No order data</h2>;

  const { product, address, paymentMethod } = state;

  const orderId = Math.floor(Math.random() * 1000000);

  const isCOD = paymentMethod === "cod";

  return (
    <div style={{
      padding: "40px",
      textAlign: "center"
    }}>
      
      {/* 🔥 TITLE BASED ON PAYMENT */}
      <h1 style={{ color: isCOD ? "#333" : "green" }}>
        {isCOD ? "📦 Order Placed Successfully" : "✅ Payment Successful"}
      </h1>

      <h3>Order ID: #{orderId}</h3>

      <img
        src={product.image}
        alt="product"
        style={{ width: "200px", marginTop: "20px" }}
      />

      <h2>{product.name}</h2>
      <p>₹{product.price}</p>

      <hr style={{ margin: "20px" }} />

      {/* 🔥 MESSAGE CHANGE */}
      <h3>
        {isCOD
          ? "Pay at delivery (Cash on Delivery)"
          : "Payment completed successfully"}
      </h3>

      <h3>Delivery Address</h3>
      <p>{address}</p>

      <h3>Payment Method</h3>
      <p>{paymentMethod.toUpperCase()}</p>

      {/* 🔥 EXTRA INFO */}
      <p style={{ marginTop: "20px", color: "#555" }}>
        {isCOD
          ? "Your order will be delivered soon. Please keep cash ready."
          : "Your order has been confirmed and is being processed."}
      </p>
    </div>
  );
}