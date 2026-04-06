import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2>No order found</h2>;

  const { product, address, paymentMethod } = state;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎉 Order Placed Successfully</h1>

      <img src={product.image} width="200" />

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <p><b>Address:</b> {address}</p>
      <p><b>Payment:</b> {paymentMethod}</p>

      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}