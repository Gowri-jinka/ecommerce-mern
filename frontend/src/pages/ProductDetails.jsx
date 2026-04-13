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

  const [showDetails, setShowDetails] = useState(false); // ✅ ADDED

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
          style={{ 
            width: "100%", 
            borderRadius: "10px",
            marginBottom: "15px"
          }} 
        />

        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>

        {/* 🔥 PRODUCT HIGHLIGHTS */}
        {product.highlights && (
          <div style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "10px",
            background: "#f5f5f5"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <h3>Product Highlights</h3>

              <button
                onClick={() => {
                  const text = `
Color: ${product.highlights?.color}
Fabric: ${product.highlights?.fabric}
Fit: ${product.highlights?.fit}
Length: ${product.highlights?.length}
                  `;
                  navigator.clipboard.writeText(text);
                  alert("Copied!");
                }}
              >
                COPY
              </button>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px"
            }}>
              <div>
                <p>Color</p>
                <h4>{product.highlights?.color}</h4>
              </div>

              <div>
                <p>Fabric</p>
                <h4>{product.highlights?.fabric}</h4>
              </div>

              <div>
                <p>Fit</p>
                <h4>{product.highlights?.fit}</h4>
              </div>

              <div>
                <p>Length</p>
                <h4>{product.highlights?.length}</h4>
              </div>
            </div>
          </div>
        )}

        {/* ✅ ADDITIONAL DETAILS */}
        <div
          onClick={() => setShowDetails(!showDetails)}
          style={{
            marginTop: "15px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Additional Details ⌄
        </div>

        {showDetails && (
          <p>{product.description}</p>
        )}

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
            <span
              key={star}
              onClick={() => setRating(star)}
            >
              ★
            </span>
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