import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  // ✅ Handle refresh / missing email
  if (!email) {
    alert("Session expired. Please signup again.");
    navigate("/signup");
  }

  const handleVerify = async () => {
    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp
      });

      alert(res.data.msg);
      navigate("/login");

    } catch (err) {
      // ✅ SHOW REAL ERROR
      console.log("VERIFY ERROR:", err.response?.data);
      alert(err.response?.data?.msg || err.message);
    }
  };

  const handleResend = async () => {
    try {
      const res = await API.post("/auth/resend-otp", { email });
      alert(res.data.msg);
    } catch (err) {
      // ✅ SHOW REAL ERROR
      console.log("RESEND ERROR:", err.response?.data);
      alert(err.response?.data?.msg || err.message);
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