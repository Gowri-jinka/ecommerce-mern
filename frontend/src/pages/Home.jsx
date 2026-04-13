import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/AppContext";

export default function Home({ category }) {
  const [products, setProducts] = useState([]);

  // 🔥 NEW STATES
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    API.get("/products")
      .then(res => {
        console.log("DATA:", res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // 🔥 UPDATED FILTER LOGIC (FIXED + SAFE)
  const filtered = products.filter((item) => {
    return (
      // 🔍 Search (safe + trim)
      item.name?.toLowerCase().includes(search.toLowerCase().trim()) &&

      // 📂 Category (fixed bug)
      (
        !category || category === "" ||
        item.category?.toLowerCase().trim() === category.toLowerCase().trim()
      ) &&

      // 💰 Price
      (!price || item.price <= price)
    );
  });

  return (
    <div>

      {/* 🔥 SEARCH + FILTER UI (UPGRADED) */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "30px 20px"
      }}>
        
        <div style={{
          position: "relative",
          width: "350px"
        }}>

          {/* 🔍 ICON */}
          <span style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "16px",
            color: "#888"
          }}>
            🔍
          </span>

          {/* INPUT */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 12px 12px 40px",
              borderRadius: "25px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "14px",
              background: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "0.3s"
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = "0 0 0 3px rgba(33,150,243,0.2)";
              e.target.style.border = "1px solid #2196f3";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              e.target.style.border = "1px solid #ddd";
            }}
          />

        </div>
      </div>

      {/* 🔥 TITLE */}
      <h2 style={{
        textAlign: "center",
        margin: "10px 0 20px",
        fontWeight: "600",
        letterSpacing: "1px"
      }}>
        {category ? `${category.toUpperCase()} PRODUCTS` : "All Products"}
      </h2>

      {/* 🔥 PRODUCTS GRID */}
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