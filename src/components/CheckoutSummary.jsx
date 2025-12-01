import React from "react";
import { Link } from "react-router-dom";

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

function CheckoutSummary({ cartItems, province, shipping }) {
  // Calculate subtotal, taxes, and total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const rates = TAX_RATES[province] || { gst: 0.05 };
  const gst = rates.gst ? subtotal * rates.gst : 0;
  const pst = rates.pst ? subtotal * rates.pst : 0;
  const rst = rates.rst ? subtotal * rates.rst : 0;
  const hst = rates.hst ? subtotal * rates.hst : 0;
  const qst = rates.qst ? subtotal * rates.qst : 0;
  const total = subtotal + gst + pst + rst + hst + qst + (shipping || 0);

  return (
    <div className="order-summary-checkout">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Subtotal</span>
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
      <div className="summary-row">
        <span>Shipping</span>
        <span>
          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
        </span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="checkout-actions">
        <Link to="/checkout" className="checkout-btn">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default CheckoutSummary;