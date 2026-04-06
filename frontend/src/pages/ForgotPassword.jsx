import { useState } from "react";
import API from "../api/axios"; // ✅ use your axios instance

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/forgot-password", {
        email
      });

      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            style={input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" style={btn}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh"
};

const box = {
  padding: "30px",
  background: "#fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  width: "300px",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "black",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};