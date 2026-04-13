import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/AppContext";

export default function Home({ category }) {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);

  // 🔥 NEW STATE
  const [recent, setRecent] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    API.get("/products")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // 🔥 LOAD RECENTLY VIEWED
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recent")) || [];
    setRecent(data);
  }, []);

  const filtered = products.filter((item) => {
    return (
      item.name?.toLowerCase().includes(search.toLowerCase().trim()) &&
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
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "25px",
            width: "300px"
          }}
        />
      </div>

      {/* 🔥 RECENTLY VIEWED */}
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