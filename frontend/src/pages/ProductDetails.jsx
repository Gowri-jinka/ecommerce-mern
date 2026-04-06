import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ProductDetails() {
  const { id } = useParams();       //get id from route 
  const [product, setProduct] = useState(null);  //firstly there is no product

  useEffect(() => {
    API.get(`/products`)
      .then(res => {
        const found = res.data.find(p => p._id === id);   //matching id
        setProduct(found);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <img src={product.image} style={{ width: "300px" }} />

      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>
    </div>
  );
}