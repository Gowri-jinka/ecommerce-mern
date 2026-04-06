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

  // 🔥 COMBINED FILTER LOGIC
  const filtered = products.filter((item) => {
    return (
      // 🔍 Search
      item.name.toLowerCase().includes(search.toLowerCase()) &&

      // 📂 Category (from Navbar)
      (category
        ? item.category.toLowerCase() === category.toLowerCase()
        : true) &&

      // 💰 Price
      (price ? item.price <= price : true)
    );
  });

  return (
    <div>

      {/* 🔥 SEARCH + FILTER UI */}
      <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
        
        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
    

      </div>

      {/* 🔥 TITLE */}
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
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