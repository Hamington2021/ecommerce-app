import { useState } from "react";

function ReviewForm({ productId, onReviewSubmit }) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reviewText.trim()) {
      alert("Please write a review");
      return;
    }

    const review = {
      rating,
      comment: reviewText,
      reviewerName: reviewerName || "Anonymous",
    };

    onReviewSubmit(review);

    // Reset form
    setRating(5);
    setReviewText("");
    setReviewerName("");
  };

  return (
    <div className="review-form">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating:</label>
          <div className="star-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star-button ${
                  star <= (hoveredRating || rating) ? "filled" : ""
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="reviewer-name">Name (optional):</label>
          <input
            type="text"
            id="reviewer-name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Your name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="review-text">Review:</label>
          <textarea
            id="review-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your thoughts about this product..."
            rows="4"
            required
            className="form-textarea"
          />
        </div>

        <button type="submit" className="submit-review-btn">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
