import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ProductDetails() {
  const { id } = useParams();       
  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [avgRating, setAvgRating] = useState(0);

  const [showDetails, setShowDetails] = useState(false);

  const handleShare = () => {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: "Check this product",
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  useEffect(() => {
    API.get(`/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.log(err));

    API.get(`/reviews/avg/${id}`)
      .then(res => setAvgRating(res.data.avg))
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    API.get(`/products`)
      .then(res => {
        const found = res.data.find(p => p._id === id);
        setProduct(found);
      });
  }, [id]);

  // 🔥 RECENTLY VIEWED FEATURE
  useEffect(() => {
    if (product) {
      let viewed = JSON.parse(localStorage.getItem("recent")) || [];

      viewed = viewed.filter(p => p._id !== product._id);
      viewed.unshift(product);
      viewed = viewed.slice(0, 5);

      localStorage.setItem("recent", JSON.stringify(viewed));
    }
  }, [product]);

  const submitReview = async () => {
    try {
      if (!rating) {
        alert("Please select rating");
        return;
      }

      await API.post("/reviews", {
        productId: id,
        rating,
        comment
      });

      alert("Review added!");

      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data);

      const avgRes = await API.get(`/reviews/avg/${id}`);
      setAvgRating(avgRes.data.avg);

      setRating(0);
      setComment("");

    } catch (err) {
      alert(err.response?.data?.msg || "Error submitting review");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{
      padding: "40px",
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.95)",
        padding: "25px",
        borderRadius: "15px",
        width: "600px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        color: "#000"
      }}>

        <img 
          src={product.image} 
          style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }} 
        />

        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>

        {/* HIGHLIGHTS */}
        {product.highlights && (
          <div style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "10px",
            background: "#f5f5f5"
          }}>
            <h3>Product Highlights</h3>
            <p>Color: {product.highlights?.color}</p>
            <p>Fabric: {product.highlights?.fabric}</p>
            <p>Fit: {product.highlights?.fit}</p>
            <p>Length: {product.highlights?.length}</p>
          </div>
        )}

        {/* DETAILS TOGGLE */}
        <div
          onClick={() => setShowDetails(!showDetails)}
          style={{ marginTop: "10px", cursor: "pointer", fontWeight: "bold" }}
        >
          Additional Details ⌄
        </div>

        {showDetails && <p>{product.description}</p>}

        {/* SHARE */}
        <button onClick={handleShare}>🔗 Share Product</button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
          target="_blank"
        >
          Share on WhatsApp
        </a>

        <hr />

        <h3>⭐ {avgRating.toFixed(1)}</h3>

        <div>
          {[1,2,3,4,5].map(star => (
            <span key={star} onClick={() => setRating(star)}>★</span>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={submitReview}>Submit Review</button>

        <div>
          {reviews.map(r => (
            <div key={r._id}>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}