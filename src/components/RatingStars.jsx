function RatingStars({ rating, maxStars = 5, showNumber = true }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star full">
          ★
        </span>
      ))}
      {hasHalfStar && <span className="star half">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>
      ))}
      {showNumber && (
        <span className="rating-number">({rating.toFixed(1)})</span>
      )}
    </div>
  );
}

export default RatingStars;
