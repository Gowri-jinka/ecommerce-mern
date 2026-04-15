import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  // ✅ FIX: handle redirect safely
  useEffect(() => {
    if (!email) {
      alert("Session expired. Please signup again.");
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleVerify = async () => {
    try {
      console.log("🔐 VERIFY CLICKED");

      const res = await API.post("/auth/verify-otp", {
        email,
        otp
      });

      console.log("✅ VERIFY RESPONSE:", res.data);

      alert(res.data.msg);

      // ✅ ONLY navigate after success
      navigate("/login");

    } catch (err) {
      console.log("❌ VERIFY ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    try {
      console.log("🔁 RESEND OTP");

      const res = await API.post("/auth/resend-otp", { email });

      console.log("✅ RESEND RESPONSE:", res.data);

      alert(res.data.msg);

    } catch (err) {
      console.log("❌ RESEND ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Error resending OTP");
    }
  };

  return (
    <div style={container}>
      <div style={box}>
        <h2>Verify OTP</h2>
        <p>OTP sent to: {email}</p>

        <input
          placeholder="Enter OTP"
          style={input}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify} style={btn}>
          Verify
        </button>

        <p
          onClick={handleResend}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Resend OTP
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