import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating}</p>
      <Link to={`/product/${product.id}`}>
        <button>Add to Cart</button>
      </Link>
    </div>
  );
}

export default ProductCard;
