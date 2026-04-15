import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/AppContext";

export default function Home({ category }) {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);

  const [recent, setRecent] = useState([]);

  const { addToCart } = useCart();

  const fileRef = useRef();

  useEffect(() => {
    API.get("/products")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recent")) || [];
    setRecent(data);
  }, []);

  // 🎤 VOICE SEARCH (FIXED)
  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      let text = event.results[0][0].transcript;

      // ✅ FIX: remove dots, commas, etc
      text = text.replace(/[.,!?]/g, "").trim();

      setSearch(text);
    };
  };

  // 📷 CAMERA
  const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const fileName = file.name.toLowerCase();

  // 🔥 Extract keyword from filename
  let keyword = "";

  if (fileName.includes("shirt")) keyword = "shirt";
  else if (fileName.includes("jeans")) keyword = "jeans";
  else if (fileName.includes("shoe")) keyword = "shoes";
  else if (fileName.includes("jacket")) keyword = "jacket";
  else if (fileName.includes("hair")) keyword = "hair";
  else if (fileName.includes("watch")) keyword = "watch";
  else keyword = "";

  setSearch(keyword);

  if (keyword) {
    alert("Matched using image name: " + keyword);
  } else {
    alert("No match found (demo logic)");
  }
};

  // 🔥 FILTER (IMPROVED)
  const filtered = products.filter((item) => {
    return (
      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase().trim().replace(/[.,!?]/g, "")) &&

      (!category || category === "" ||
        item.category?.toLowerCase().trim() === category.toLowerCase().trim()
      ) &&

      (!price || item.price <= price)
    );
  });

  return (
    <div>

      {/* SEARCH */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "30px 20px"
      }}>
        
        <div style={{
          position: "relative",
          width: "350px"
        }}>

          <span style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#888"
          }}>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 80px 12px 40px",
              borderRadius: "25px",
              border: "1px solid #ddd"
            }}
          />

          {/* 🎤 */}
          <span
            onClick={handleVoice}
            style={{
              position: "absolute",
              right: "45px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer"
            }}
          >
            🎤
          </span>

          {/* 📷 */}
          <span
            onClick={() => fileRef.current.click()}
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer"
            }}
          >
            📷
          </span>

          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={handleImage}
          />

        </div>
      </div>

      {/* RECENT */}
      {recent.length > 0 && (
        <div style={{ padding: "20px" }}>
          <h3>🕒 Recently Viewed</h3>

          <div style={{
            display: "flex",
            gap: "15px",
            overflowX: "auto"
          }}>
            {recent.map((p) => (
              <div key={p._id} style={{ minWidth: "200px" }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TITLE */}
      <h2 style={{
        textAlign: "center",
        margin: "10px 0 20px"
      }}>
        {category ? `${category.toUpperCase()} PRODUCTS` : "All Products"}
      </h2>

      {/* PRODUCTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px",
          padding: "20px"
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No products found</p>
        )}
      </div>

    </div>
  );
}