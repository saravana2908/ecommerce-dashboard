import Navbar from "../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const savings = cartItems.reduce((acc, item) => {
    const orig = item.originalPrice || item.price * 1.2;
    return acc + (orig - item.price) * item.quantity;
  }, 0);

  const deliveryFree = subtotal >= 499;

  return (
    <>
      <Navbar />

      <div className="ct-page">

        {/* ── Header ── */}
        <div className="ct-header">
          <div className="ct-header-inner">
            <div>
              <h1 className="ct-title">Shopping Cart</h1>
              <p className="ct-subtitle">
                {cartItems.length > 0
                  ? `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} in your cart`
                  : "Your cart is empty"}
              </p>
            </div>
            <span className="ct-header-icon">🛒</span>
          </div>
        </div>

        <div className="ct-container">

          {cartItems.length === 0 ? (

            /* ── Empty State ── */
            <div className="ct-empty">
              <div className="ct-empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything yet. Start shopping to fill it up!</p>
              <a href="/products" className="ct-browse-btn">Browse Products →</a>
            </div>

          ) : (

            <div className="ct-layout">

              {/* ── Left: Items ── */}
              <div className="ct-items">

                {/* Free delivery progress */}
                {!deliveryFree && (
                  <div className="ct-delivery-bar">
                    <span>🚚</span>
                    <div className="ct-delivery-text">
                      Add <strong>₹{(499 - subtotal).toLocaleString("en-IN")}</strong> more for free delivery
                      <div className="ct-delivery-track">
                        <div
                          className="ct-delivery-fill"
                          style={{ width: `${Math.min((subtotal / 499) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {deliveryFree && (
                  <div className="ct-delivery-bar ct-delivery-done">
                    <span>🎉</span>
                    <strong>You've unlocked free delivery!</strong>
                  </div>
                )}

                {cartItems.map((item) => (
                  <div key={item.id} className="ct-card">

                    {/* Remove ✕ */}
                    <button
                      className="ct-remove-icon"
                      title="Remove item"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      aria-label="Remove"
                    >
                      ✕
                    </button>

                    {/* Image */}
                    <div className="ct-img-wrap">
                      <img src={item.image} alt={item.title} className="ct-img" />
                    </div>

                    {/* Info */}
                    <div className="ct-info">
                      <span className="ct-item-category">{item.category}</span>
                      <h3 className="ct-item-name">{item.title}</h3>

                      <div className="ct-item-pricing">
                        <span className="ct-item-price">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        {item.originalPrice && (
                          <span className="ct-item-original">
                            ₹{item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <div className="ct-item-bottom">
                        {/* Quantity stepper */}
                        <div className="ct-qty">
                          <button
                            className="ct-qty-btn"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            aria-label="Decrease"
                          >
                            −
                          </button>
                          <span className="ct-qty-val">{item.quantity}</span>
                          <button
                            className="ct-qty-btn"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="ct-line-total">
                          <span className="ct-line-label">Subtotal</span>
                          <span className="ct-line-price">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}

              </div>

              {/* ── Right: Order Summary ── */}
              <aside className="ct-summary">
                <h2 className="ct-summary-title">Order Summary</h2>

                <div className="ct-summary-rows">
                  <div className="ct-summary-row">
                    <span>Items ({cartItems.length})</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="ct-summary-row ct-savings-row">
                    <span>You save</span>
                    <span>− ₹{Math.round(savings).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="ct-summary-row">
                    <span>Delivery</span>
                    <span className={deliveryFree ? "ct-free" : ""}>
                      {deliveryFree ? "FREE" : "₹49"}
                    </span>
                  </div>
                </div>

                <div className="ct-summary-divider" />

                <div className="ct-summary-total">
                  <span>Total</span>
                  <span>₹{(subtotal + (deliveryFree ? 0 : 49)).toLocaleString("en-IN")}</span>
                </div>

                <button className="ct-checkout-btn">
                  Proceed to Checkout →
                </button>
                <a href="/products" className="ct-continue-link">← Continue Shopping</a>

                {/* Trust signals */}
                <div className="ct-trust">
                  <div className="ct-trust-item"><span>🔒</span> Secure checkout</div>
                  <div className="ct-trust-item"><span>↩</span> 10-day easy returns</div>
                  <div className="ct-trust-item"><span>📞</span> 24/7 support</div>
                </div>

                {/* Accepted payments */}
                <div className="ct-payments">
                  <span className="ct-payments-label">We accept</span>
                  <div className="ct-payment-icons">
                    <span>💳</span><span>🏦</span><span>📱</span><span>💰</span>
                  </div>
                </div>
              </aside>

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Cart;
