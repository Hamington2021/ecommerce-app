import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import { addToCart, getReviews, addReview } from "../services/localStorage";
import RatingStars from "../components/RatingStars";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import Footer from "../components/Footer";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data);
      setSelectedImage(0);
    });
    setUserReviews(getReviews(id));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setCartMessage("Added to cart!");
      setTimeout(() => setCartMessage(""), 2000);

      // Dispatch custom event for cart update
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const handleReviewSubmit = (review) => {
    addReview(id, review);
    setUserReviews(getReviews(id));
  };

  if (!product) return <div className="loading">Loading...</div>;

  // Calculate average rating with user reviews
  const apiReviews = product.reviews || [];
  const totalReviews = apiReviews.length + userReviews.length;
  const averageRating =
    totalReviews > 0
      ? (product.rating + userReviews.reduce((sum, r) => sum + r.rating, 0)) /
        (userReviews.length + 1)
      : product.rating;

  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="product-detail-page">
      <header className="detail-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        <Link to="/cart" className="cart-link">
          🛒 Cart
        </Link>
      </header>

      <div className="product-detail">
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="detail-image"
            />
            {product.discountPercentage > 0 && (
              <span className="discount-badge-large">
                -{product.discountPercentage}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info-detail">
          <h1>{product.title}</h1>
          <p className="brand">Brand: {product.brand || "N/A"}</p>
          <p className="category-badge">{product.category}</p>

          <div className="rating-section">
            <RatingStars rating={averageRating} />
            <span className="review-count">({totalReviews} reviews)</span>
          </div>

          <p className="description">{product.description}</p>

          <div className="price-section-detail">
            {discountedPrice ? (
              <>
                <span className="original-price-large">${product.price}</span>
                <span className="discounted-price-large">
                  ${discountedPrice}
                </span>
                <span className="savings">
                  You save: ${(product.price - discountedPrice).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="price-large">${product.price}</span>
            )}
          </div>

          <div className="product-meta">
            <p>
              <strong>Stock:</strong>{" "}
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </p>
            {product.warrantyInformation && (
              <p>
                <strong>Warranty:</strong> {product.warrantyInformation}
              </p>
            )}
            {product.shippingInformation && (
              <p>
                <strong>Shipping:</strong> {product.shippingInformation}
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn-large"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
          {cartMessage && (
            <span className="cart-message-large">{cartMessage}</span>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <ReviewList apiReviews={apiReviews} userReviews={userReviews} />
        <ReviewForm productId={id} onReviewSubmit={handleReviewSubmit} />
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetail;
