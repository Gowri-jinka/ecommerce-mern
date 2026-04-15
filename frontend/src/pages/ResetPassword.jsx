import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      alert(res.data.msg);

      // ✅ redirect after success
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Error resetting password");
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            style={input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={btn}>
            Reset Password
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