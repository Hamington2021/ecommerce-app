import RatingStars from "./RatingStars";

function ReviewList({ apiReviews = [], userReviews = [] }) {
  const allReviews = [...userReviews, ...apiReviews];

  if (allReviews.length === 0) {
    return (
      <p className="no-reviews">No reviews yet. Be the first to review!</p>
    );
  }

  return (
    <div className="review-list">
      <h3>Customer Reviews ({allReviews.length})</h3>
      {allReviews.map((review, index) => (
        <div key={review.id || index} className="review-item">
          <div className="review-header">
            <strong>
              {review.reviewerName || review.reviewerEmail || "Anonymous"}
            </strong>
            <RatingStars rating={review.rating} showNumber={false} />
          </div>
          <p className="review-comment">{review.comment}</p>
          {review.date && (
            <span className="review-date">
              {new Date(review.date).toLocaleDateString()}
            </span>
          )}
          {userReviews.includes(review) && (
            <span className="user-review-badge">Your Review</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
