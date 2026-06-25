import Navbar from "../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import "./Wishlist.css";
import { useState } from "react";
import { addToCart } from "../../features/cart/cartSlice";
function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 3;
const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;

const endIndex = startIndex + itemsPerPage;

const currentWishlistItems = wishlistItems.slice(startIndex, endIndex);
  return (
    <>
      <Navbar />

      <div className="wl-page">

        {/* ── Page Header ── */}
        <div className="wl-header">
          <div className="wl-header-inner">
            <div className="wl-header-text">
              <h1 className="wl-title">My Wishlist</h1>
              <p className="wl-subtitle">
                {wishlistItems.length > 0
                  ? `${wishlistItems.length} item${wishlistItems.length > 1 ? "s" : ""} saved`
                  : "Nothing saved yet"}
              </p>
            </div>
            <div className="wl-heart-icon">♡</div>
          </div>
        </div>

        <div className="wl-container">

          {wishlistItems.length === 0 ? (

            /* ── Empty State ── */
            <div className="wl-empty">
              <div className="wl-empty-icon">♡</div>
              <h2>Your wishlist is empty</h2>
              <p>Browse our catalogue and save products you love — they'll appear here.</p>
              <a href="/products" className="wl-browse-btn">Browse Products →</a>
            </div>

          ) : (

            <div className="wl-layout">

              {/* ── Grid ── */}
              <div className="wl-grid">
                {currentWishlistItems.map((item) => (
                  <div className="wl-card" key={item.id}>

                    {/* Remove (top-right X) */}
                    <button
                      className="wl-remove-icon"
                      title="Remove from wishlist"
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                      aria-label="Remove"
                    >
                      ✕
                    </button>

                    {/* Image */}
                    <div className="wl-img-wrap">
                      <img src={item.image} alt={item.title} className="wl-img" />
                    </div>

                    {/* Info */}
                    <div className="wl-info">
                      <span className="wl-category">{item.category}</span>
                      <h3 className="wl-name">{item.title}</h3>

                      <div className="wl-pricing">
                        <span className="wl-price">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                        {item.originalPrice && (
                          <span className="wl-original">
                            ₹{item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <div className="wl-actions">
                        <button
  className="wl-cart-btn"
  onClick={() => dispatch(addToCart(item))}
>
  🛒 Add to Cart
</button>
                        <button
                          className="wl-del-btn"
                          onClick={() => dispatch(removeFromWishlist(item.id))}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
                {totalPages > 1 && (
  <div className="wishlist-pagination">
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={currentPage === index + 1 ? "active-page" : ""}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)}
              </div>

              {/* ── Sidebar Summary ── */}
              <aside className="wl-summary">
                <h2 className="wl-summary-title">Summary</h2>

                <div className="wl-summary-row">
                  <span>Items saved</span>
                  <strong>{wishlistItems.length}</strong>
                </div>
                <div className="wl-summary-row">
                  <span>Total value</span>
                  <strong>
                    ₹{wishlistItems
                      .reduce((acc, i) => acc + i.price, 0)
                      .toLocaleString("en-IN")}
                  </strong>
                </div>

                <button className="wl-all-cart-btn">Add All to Cart</button>
                <a href="/products" className="wl-continue-link">← Continue Shopping</a>

                <div className="wl-perks">
                  <div className="wl-perk"><span>🚚</span> Free delivery on orders ₹499+</div>
                  <div className="wl-perk"><span>🔒</span> Secure checkout</div>
                  <div className="wl-perk"><span>↩</span> 10-day easy returns</div>
                </div>
              </aside>

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Wishlist;
