import { useState } from "react";
import API from "../api/axios";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const addProduct = async () => {
    try {
      await API.post("/products", {
        name,
        price,
        category
      });

      alert("Product Added");
    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>

      <input
        placeholder="Product Name"
        onChange={e => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Price"
        onChange={e => setPrice(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Category"
        onChange={e => setCategory(e.target.value)}
      />
      <br /><br />

      <button onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
}