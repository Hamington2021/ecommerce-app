import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../services/localStorage";
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

function Checkout() {
  const [cart, setCart] = useState([]);
  const [province, setProvince] = useState("Quebec");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "Quebec",
    zipCode: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
    bankAccountHolder: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = getCart();
    if (cartData.length === 0) {
      navigate("/cart");
    }
    setCart(cartData);
  }, [navigate]);

  // Tax calculation based on selected province
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const rates = TAX_RATES[province] || { gst: 0.05 };
  const gst = rates.gst ? subtotal * rates.gst : 0;
  const pst = rates.pst ? subtotal * rates.pst : 0;
  const rst = rates.rst ? subtotal * rates.rst : 0;
  const hst = rates.hst ? subtotal * rates.hst : 0;
  const qst = rates.qst ? subtotal * rates.qst : 0;
  const totalTax = gst + pst + rst + hst + qst;
  const total = subtotal + totalTax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "state") {
      setProvince(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for shipping info
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode ||
      !formData.paymentMethod
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate payment method specific fields
    if (formData.paymentMethod === "credit-card") {
      if (!(formData.cardNumber && formData.cardNumber.trim()) || !(formData.expiryDate && formData.expiryDate.trim()) || !(formData.cvv && formData.cvv.trim())) {
        alert("Please fill in all credit card fields");
        return;
      }
    } else if (formData.paymentMethod === "paypal") {
      if (!(formData.paypalEmail && formData.paypalEmail.trim())) {
        alert("Please enter your PayPal email");
        return;
      }
    } else if (formData.paymentMethod === "bank-transfer") {
      if (
        !(formData.bankAccountHolder && formData.bankAccountHolder.trim()) ||
        !(formData.bankAccountNumber && formData.bankAccountNumber.trim()) ||
        !(formData.bankRoutingNumber && formData.bankRoutingNumber.trim())
      ) {
        alert("Please fill in all bank transfer fields");
        return;
      }
    }

    // Store order data
    const orderData = {
      orderNumber: Date.now().toString(),
      date: new Date().toISOString(),
      items: cart,
      customerInfo: {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      paymentMethod: formData.paymentMethod,
      totals: {
        subtotal,
        gst,
        pst,
        rst,
        hst,
        qst,
        tax: totalTax,
        total,
      },
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    clearCart();
    navigate("/order-confirmation");
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <Link to="/cart" className="back-link">
          ← Back to Cart
        </Link>
        <h1>Checkout</h1>
      </header>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <section className="form-section">
            <h2>Shipping Information</h2>
            <div className="form-row">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row-group">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              >
                {PROVINCES.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </section>

          <section className="form-section">
            <h2>Payment Method</h2>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={formData.paymentMethod === "credit-card"}
                  onChange={handleInputChange}
                />
                <span className="payment-label">Credit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleInputChange}
                />
                <span className="payment-label">PayPal</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank-transfer"
                  checked={formData.paymentMethod === "bank-transfer"}
                  onChange={handleInputChange}
                />
                <span className="payment-label">Bank Transfer</span>
              </label>
            </div>
          </section>

          <section className="form-section">
            <h2>Payment Information</h2>

            {formData.paymentMethod === "credit-card" && (
              <>
                <div className="form-row">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="16"
                  />
                </div>
                <div className="form-row-group">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    maxLength="5"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="3"
                  />
                </div>
              </>
            )}

            {formData.paymentMethod === "paypal" && (
              <div className="form-row">
                <input
                  type="text"
                  name="paypalEmail"
                  placeholder="PayPal Email Address"
                  value={formData.paypalEmail}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {formData.paymentMethod === "bank-transfer" && (
              <>
                <div className="form-row">
                  <input
                    type="text"
                    name="bankAccountHolder"
                    placeholder="Account Holder Name"
                    value={formData.bankAccountHolder}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="bankAccountNumber"
                    placeholder="Account Number"
                    value={formData.bankAccountNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="bankRoutingNumber"
                    placeholder="Routing Number"
                    value={formData.bankRoutingNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </section>

          <button type="submit" className="place-order-btn">
            Place Order - ${total.toFixed(2)}
          </button>
        </form>

        <div className="order-summary-checkout">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="summary-item-info">
                  <p>{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
