import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/login", form);

      // ✅ FIX: STORE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ Store user
      login({
        name: res.data.user.name,
        email: res.data.user.email
      });

      navigate("/");

    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg === "Verify OTP first") {
        alert("Please verify OTP first");

        navigate("/verify-otp", {
          state: { email: form.email }
        });

      } else {
        alert(msg || "Login failed");
      }
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          style={input}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          style={input}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleSubmit} style={btn}>
          Login
        </button>

        <p style={{ marginTop: "10px" }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
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