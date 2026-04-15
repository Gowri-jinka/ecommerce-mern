import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("🔥 BUTTON CLICKED");

      // ✅ VALIDATION
      if (!form.name || !form.email || !form.password) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      console.log("📤 Sending Signup Data:", form);

      const res = await API.post("/auth/register", form);

      console.log("✅ SUCCESS RESPONSE:", res.data);

      alert(res.data.msg);

      // ✅ Navigate to OTP page
      navigate("/verify-otp", {
        state: { email: form.email }
      });

    } catch (err) {
      console.log("❌ FULL ERROR:", err);

      if (err.response) {
        console.log("❌ SERVER ERROR:", err.response.data);
        alert(err.response.data.msg || "Server error");
      } else if (err.request) {
        console.log("❌ NO RESPONSE FROM SERVER");
        alert("Backend not responding");
      } else {
        console.log("❌ ERROR:", err.message);
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>Create Account</h2>

        <input
          placeholder="Name"
          style={input}
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          style={input}
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          style={input}
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          style={{
            ...btn,
            background: loading ? "#555" : "black",
            cursor: loading ? "not-allowed" : "pointer"
          }}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
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
  color: "#fff",
  border: "none"
};