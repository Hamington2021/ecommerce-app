import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../services/localStorage";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";

// Province tax rates mapping
const TAX_RATES = {
  Alberta: { gst: 0.05 },
  "British Columbia": { gst: 0.05, pst: 0.07 },
  Manitoba: { gst: 0.05, rst: 0.07 },
  "New Brunswick": { hst: 0.15 },
  "Newfoundland and Labrador": { hst: 0.15 },
  "Northwest Territories": { gst: 0.05 },
  "Nova Scotia": { hst: 0.15 },
  Nunavut: { gst: 0.05 },
  Ontario: { hst: 0.13 },
  "Prince Edward Island": { hst: 0.15 },
  Quebec: { gst: 0.05, qst: 0.09975 },
  Saskatchewan: { gst: 0.05, pst: 0.06 },
  Yukon: { gst: 0.05 },
};

const PROVINCES = Object.keys(TAX_RATES);

function Cart() {
  const [cart, setCart] = useState([]);
  const [province, setProvince] = useState("Quebec");
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCart(getCart());
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Tax calculation based on selected province
  const rates = TAX_RATES[province] || { gst: 0.05 };
  const gst = rates.gst ? subtotal * rates.gst : 0;
  const pst = rates.pst ? subtotal * rates.pst : 0;
  const rst = rates.rst ? subtotal * rates.rst : 0;
  const hst = rates.hst ? subtotal * rates.hst : 0;
  const qst = rates.qst ? subtotal * rates.qst : 0;
  const total = subtotal + gst + pst + rst + hst + qst;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <Link to="/" className="back-link">
          ← Continue Shopping
        </Link>
        <h1>Shopping Cart</h1>
      </header>

      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/" className="shop-now-btn">
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              <div className="cart-items-header">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span></span>
              </div>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} onUpdate={loadCart} />
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Items ({totalItems}):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>
                  Province:{" "}
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="province-select"
                  >
                    {PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              {hst > 0 && (
                <div className="summary-row">
                  <span>HST ({(rates.hst * 100).toFixed(1)}%)</span>
                  <span>${hst.toFixed(2)}</span>
                </div>
              )}
              {gst > 0 && (
                <div className="summary-row">
                  <span>GST ({(rates.gst * 100).toFixed(1)}%)</span>
                  <span>${gst.toFixed(2)}</span>
                </div>
              )}
              {pst > 0 && (
                <div className="summary-row">
                  <span>PST ({(rates.pst * 100).toFixed(1)}%)</span>
                  <span>${pst.toFixed(2)}</span>
                </div>
              )}
              {rst > 0 && (
                <div className="summary-row">
                  <span>RST ({(rates.rst * 100).toFixed(1)}%)</span>
                  <span>${rst.toFixed(2)}</span>
                </div>
              )}
              {qst > 0 && (
                <div className="summary-row">
                  <span>QST ({(rates.qst * 100).toFixed(3)}%)</span>
                  <span>${qst.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
