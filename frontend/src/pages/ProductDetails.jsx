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
      {/* 🔥 NEW CARD WRAPPER (MAIN FIX) */}
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
          style={{ 
            width: "100%", 
            borderRadius: "10px",
            marginBottom: "15px"
          }} 
        />

        <h2 style={{ marginBottom: "10px" }}>{product.name}</h2>
        <p style={{ marginBottom: "10px" }}>{product.description}</p>
        <h3 style={{ marginBottom: "15px" }}>₹{product.price}</h3>

        <hr />

        <h3>⭐ Average Rating: {avgRating.toFixed(1)}</h3>

        <div>
          {[1,2,3,4,5].map(star => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "gold" : "gray",
                fontSize: "22px"
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            display: "block",
            marginTop: "10px",
            width: "100%",
            height: "80px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={submitReview}
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
            background: "#ff6b00",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Submit Review
        </button>

        <div style={{ marginTop: "20px" }}>
          {reviews.length > 0 ? (
            reviews.map(r => (
              <div
                key={r._id}
                style={{
                  borderBottom: "1px solid #ccc",
                  marginBottom: "10px",
                  paddingBottom: "10px"
                }}
              >
                <p><b>{r.userId?.name || "User"}</b></p>
                <p>⭐ {r.rating}</p>
                <p>{r.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet</p>
          )}
        </div>

      </div>
    </div>
  );
}