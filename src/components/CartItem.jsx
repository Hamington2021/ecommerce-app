import { removeFromCart, updateCartQuantity } from "../services/localStorage";

function CartItem({ item, onUpdate }) {
  const handleQuantityChange = (newQuantity) => {
    updateCartQuantity(item.id, newQuantity);
    onUpdate();
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    onUpdate();
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />

      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-price">${item.price}</p>
      </div>

      <div className="cart-item-quantity">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="quantity-btn"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        <span>${itemTotal}</span>
      </div>

      <button onClick={handleRemove} className="remove-btn">
        ✕
      </button>
    </div>
  );
}

export default CartItem;
