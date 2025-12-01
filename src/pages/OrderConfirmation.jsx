import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function OrderConfirmation() {
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrderData(JSON.parse(lastOrder));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!orderData) {
    return <div className="loading">Loading...</div>;
  }

  // Calculate GST and QST if not present in orderData.totals
  const subtotal = orderData.totals?.subtotal || 0;
  const province = orderData.customerInfo?.state || "";
  const GST_RATE = 0.05;
  const QST_RATE = 0.09975;
  const gst =
    orderData.totals?.gst !== undefined
      ? orderData.totals.gst
      : subtotal * GST_RATE;
  const pst = orderData.totals?.pst || 0;
  const rst = orderData.totals?.rst || 0;
  const hst = orderData.totals?.hst || 0;
  const qst =
    province === "Quebec"
      ? orderData.totals?.qst !== undefined
        ? orderData.totals.qst
        : subtotal * QST_RATE
      : 0;
  const tax = orderData.totals?.tax || (gst + pst + rst + hst + qst);
  const shipping = orderData.totals?.shipping || 0;
  const total = orderData.totals?.total || (subtotal + tax);

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-content">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p className="confirmation-message">
          Thank you for your purchase! Your order has been successfully placed.
        </p>

        <div className="order-details">
          <h2>Order Details</h2>
          <div className="order-info">
            <div className="info-row">
              <span className="label">Order Number:</span>
              <span className="value">#{orderData.orderNumber}</span>
            </div>
            <div className="info-row">
              <span className="label">Date:</span>
              <span className="value">
                {new Date(orderData.date).toLocaleDateString()}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{orderData.customerInfo.email}</span>
            </div>
          </div>

          <h3>Shipping Address</h3>
          <div className="shipping-info">
            <p>{orderData.customerInfo.fullName}</p>
            <p>{orderData.customerInfo.address}</p>
            <p>
              {orderData.customerInfo.city}, {orderData.customerInfo.state}{" "}
              {orderData.customerInfo.zipCode}
            </p>
          </div>

          <h3>Order Items</h3>
          <div className="order-items">
            {orderData.items.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="item-details">
                  <p className="item-title">{item.title}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <span className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>GST (5%):</span>
              <span>${gst.toFixed(2)}</span>
            </div>
            {pst > 0 && (
              <div className="total-row">
                <span>PST (7%):</span>
                <span>${pst.toFixed(2)}</span>
              </div>
            )}
            {rst > 0 && (
              <div className="total-row">
                <span>RST (7%):</span>
                <span>${rst.toFixed(2)}</span>
              </div>
            )}
            {hst > 0 && (
              <div className="total-row">
                <span>HST (13-15%):</span>
                <span>${hst.toFixed(2)}</span>
              </div>
            )}
            {province === "Quebec" && (
              <div className="total-row">
                <span>QST (9.975%):</span>
                <span>${qst.toFixed(2)}</span>
              </div>
            )}
            {shipping > 0 && (
              <div className="total-row">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            )}
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
          <button onClick={() => window.print()} className="print-order-btn">
            Print Order
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OrderConfirmation;
