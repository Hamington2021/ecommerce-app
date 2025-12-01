import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { addToCart } from "../services/localStorage";
import { getReviews } from "../services/localStorage";
import { useState } from "react";

function ProductCard({ product }) {
  const [cartMessage, setCartMessage] = useState("");

  // Calculate dynamic rating based on user reviews
  const userReviews = getReviews(product.id);
  const totalRating =
    userReviews.length > 0
      ? (product.rating + userReviews.reduce((sum, r) => sum + r.rating, 0)) /
        (userReviews.length + 1)
      : product.rating;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setCartMessage("Added to cart!");
    setTimeout(() => setCartMessage(""), 2000);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image">
          <img src={product.thumbnail} alt={product.title} />
          {product.discountPercentage > 0 && (
            <span className="discount-badge">
              -{product.discountPercentage}%
            </span>
          )}
        </div>
        <div className="product-info">
          <h3>{product.title}</h3>
          <p className="category">{product.category}</p>
          <RatingStars rating={totalRating} />
          <div className="price-section">
            {discountedPrice ? (
              <>
                <span className="original-price">${product.price}</span>
                <span className="discounted-price">${discountedPrice}</span>
              </>
            ) : (
              <span className="price">${product.price}</span>
            )}
          </div>
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
          {cartMessage && <span className="cart-message">{cartMessage}</span>}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
