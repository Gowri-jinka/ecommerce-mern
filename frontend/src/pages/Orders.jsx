import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    API.get(`/orders/user/${user._id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>

      {orders.length > 0 ? (
        orders.map(o => (
          <div key={o._id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "8px"
          }}>
            <h4>{o.product?.name}</h4>
            <p>₹{o.product?.price}</p>
            <p>{o.address}</p>
            <p>Status: {o.status}</p>
          </div>
        ))
      ) : (
        <p>No orders yet</p>
      )}
    </div>
  );
}