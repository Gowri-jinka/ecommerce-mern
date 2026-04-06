import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    profilePic: ""
  });

  // IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "your_upload_preset"); 
    data.append("cloud_name", "YOUR_CLOUD_NAME");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        {
          method: "POST",
          body: data
        }
      );

      const result = await res.json();

      setForm((prev) => ({
        ...prev,
        profilePic: result.secure_url
      }));

      alert("Image uploaded successfully!");
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    }
  };

  // FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile");

        setUser(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          password: "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          profilePic: res.data.profilePic || ""
        });

      } catch (error) {
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        profilePic: form.profilePic
      };

      if (form.password) {
        updatedData.password = form.password;
      }

      const res = await API.put("/user/profile", updatedData);
      alert(res.data.msg);

      setEdit(false);

      const updated = await API.get("/user/profile");
      setUser(updated.data);

    } catch (error) {
      alert("Update failed");
    }
  };

  if (loading) return <h2 style={center}>Loading...</h2>;
  if (!user) return <h2 style={center}>No user data</h2>;

  return (
    <div style={container}>

      <div style={card}>

        <h2 style={title}>👤 My Profile</h2>

        {/* IMAGE */}
        <img
          src={edit ? form.profilePic : user.profilePic || "https://via.placeholder.com/100"}
          alt="profile"
          style={avatar}
        />

        {!edit ? (
          <>
            <div style={info}>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Phone:</b> {user.phone || "Not added"}</p>
              <p><b>Address:</b> {user.address || "Not added"}</p>
            </div>

            <button onClick={() => setEdit(true)} style={btnPrimary}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={input}
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={input}
            />

            <input
              type="password"
              placeholder="New Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={input}
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={input}
            />

            <input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              style={input}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginBottom: "10px", color: "#fff" }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleUpdate} style={btnSuccess}>
                Save
              </button>

              <button onClick={() => setEdit(false)} style={btnCancel}>
                Cancel
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

/* STYLES */

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  position: "relative",
  zIndex: 1
};

const card = {
  width: "380px",
  padding: "30px",
  borderRadius: "15px",
  textAlign: "center",
  background: "rgba(0,0,0,0.7)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)"
};

const title = {
  color: "#fff",
  marginBottom: "20px"
};

const avatar = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  marginBottom: "20px"
};

const info = {
  color: "#ddd",
  textAlign: "left",
  marginBottom: "20px",
  lineHeight: "1.8"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none"
};

const btnPrimary = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(135deg, #ff9800, #ff5722)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const btnSuccess = {
  flex: 1,
  padding: "10px",
  background: "#00c853",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const btnCancel = {
  flex: 1,
  padding: "10px",
  background: "#555",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const center = {
  textAlign: "center",
  color: "#fff",
  marginTop: "50px"
};