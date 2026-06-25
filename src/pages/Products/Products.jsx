import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useGetProductsQuery } from "../../services/api";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
import { useSelector } from "react-redux";
import {removeFromWishlist} from "../../features/wishlist/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";

const CATEGORIES = ["All", "Mobile", "Laptop", "Headphones", "Smartwatch"];

const PRICE_RANGES = [
  { label: "All Prices", value: "all" },
  { label: "Under ₹20,000", value: "under20" },
  { label: "₹20,000 – ₹50,000", value: "20to50" },
  { label: "Above ₹50,000", value: "above50" },
];

const SORT_OPTIONS = [
  { label: "Relevance", value: "default" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rating", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
  { label: "Biggest Discount", value: "discount" },
];

function Products() {
  const { data, isLoading, error } = useGetProductsQuery();
const dispatch = useDispatch();
  
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  
  const search = useSelector(
(state)=>state.search.searchText
);
  const [sidebarOpen, setSidebarOpen] = useState(false);
const navigate = useNavigate();
const wishlistItems = useSelector(
  (state) => state.wishlist.items
);
  if (isLoading)
    return (
      <div className="state-screen">
        <Navbar />
        <div className="state-content">
          <div className="spinner" />
          <p>Loading products...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="state-screen">
        <Navbar />
        <div className="state-content error">
          <span className="state-icon">⚠</span>
          <p>Failed to load products. Please try again.</p>
        </div>
      </div>
    );

  

  const matchesPrice = (price) => {
    if (priceRange === "under20") return price < 20000;
    if (priceRange === "20to50") return price >= 20000 && price <= 50000;
    if (priceRange === "above50") return price > 50000;
    return true;
  };

  const filtered = (data || []).filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    const matchPrice = matchesPrice(p.price || 0);
    return matchSearch && matchCat && matchPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price_asc") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price_desc") return (b.price || 0) - (a.price || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "reviews") return (b.reviews || 0) - (a.reviews || 0);
    if (sortBy === "discount") return (b.discount || 0) - (a.discount || 0);
    return 0;
  });

  const resetFilters = () => {
    setCategory("All");
    setPriceRange("all");
    setSortBy("default");
    setSearch("");
  };

  const hasActiveFilters =
    category !== "All" || priceRange !== "all" || search !== "";

  return (
    <div className="products-page">
      <Navbar />

      <div className="products-wrapper">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
          <div className="sidebar-header">
            <span className="sidebar-title">Filters</span>
            {hasActiveFilters && (
              <button className="clear-btn" onClick={resetFilters}>
                Clear all
              </button>
            )}
          </div>

          

          {/* Categories */}
          <div className="filter-group">
            <p className="filter-label">Category</p>
            <ul className="filter-list">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    className={`filter-item ${category === cat ? "filter-item--active" : ""}`}
                    onClick={() => setCategory(cat)}
                  >
                    <span className="filter-dot" />
                    {cat === "All" ? "All Products" : cat}
                    <span className="filter-count">
                      {cat === "All"
                        ? data?.length || 0
                        : data?.filter((p) => p.category === cat).length || 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-divider" />

          {/* Price Range */}
          <div className="filter-group">
            <p className="filter-label">Price Range</p>
            <ul className="filter-list">
              {PRICE_RANGES.map((range) => (
                <li key={range.value}>
                  <button
                    className={`filter-item ${priceRange === range.value ? "filter-item--active" : ""}`}
                    onClick={() => setPriceRange(range.value)}
                  >
                    <span className="filter-dot" />
                    {range.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-divider" />

          {/* Sort */}
          <div className="filter-group">
            <p className="filter-label">Sort By</p>
            <ul className="filter-list">
              {SORT_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    className={`filter-item ${sortBy === opt.value ? "filter-item--active" : ""}`}
                    onClick={() => setSortBy(opt.value)}
                  >
                    <span className="filter-dot" />
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="products-main">

          {/* Top bar */}
          <div className="products-topbar">
            <div className="topbar-left">
              <button
                className="filter-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle filters"
              >
                ☰ Filters
              </button>
              <h1 className="products-heading">Explore Products</h1>
            </div>
            <div className="topbar-right">
              <span className="result-count">
                {sorted.length} {sorted.length === 1 ? "product" : "products"}
              </span>
              {/* Active filter chips */}
              <div className="active-chips">
                {category !== "All" && (
                  <span className="chip">
                    {category}
                    <button onClick={() => setCategory("All")}>×</button>
                  </span>
                )}
                {priceRange !== "all" && (
                  <span className="chip">
                    {PRICE_RANGES.find((r) => r.value === priceRange)?.label}
                    <button onClick={() => setPriceRange("all")}>×</button>
                  </span>
                )}
                {sortBy !== "default" && (
                  <span className="chip">
                    {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                    <button onClick={() => setSortBy("default")}>×</button>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Empty state */}
          {sorted.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button className="reset-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}

          {/* Grid */}
          <div className="products-grid">
            {sorted.map((product) => (
              <div className="product-card" key={product.id}>

                {/* Badge */}
                {(product.discount || 0) > 0 && (
                  <span className="badge-discount">
                    {product.discount}% OFF
                  </span>
                )}

                {/* Wishlist */}
                <button
  className={`wishlist-btn ${
    wishlistItems.some(
      (item) => item.id === product.id
    )
      ? "wishlist-btn--active"
      : ""
  }`}
  onClick={() => {

  const isWishlisted =
    wishlistItems.some(
      (item) => item.id === product.id
    );

  if (isWishlisted) {

    dispatch(
      removeFromWishlist(product.id)
    );

    toast.info("💔 Removed from Wishlist");

  } else {

    dispatch(
      addToWishlist(product)
    );

    toast.success("❤️ Added to Wishlist");

  }

}}
>
  {wishlistItems.some(
    (item) => item.id === product.id
  )
    ? "♥"
    : "♡"}
</button>
                {/* Image */}
                <div className="card-image-wrap">
                  <img
                  
                    src={product.image}
                    alt={product.title}
                    className="card-image"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="card-body">
                  <span className="card-category">{product.category}</span>
                  <h3 className="card-title">{product.title}</h3>

                  <div className="card-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-val">{product.rating || 4.0}</span>
                    <span className="rating-count">({product.reviews || 0})</span>
                  </div>

                  <div className="card-price">
                    <span className="price-current">
                      ₹{(product.price || 0).toLocaleString("en-IN")}
                    </span>
                    {product.oldPrice && product.oldPrice !== product.price && (
                      <span className="price-old">
                        ₹{product.oldPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div className="card-actions">
                    <button
  className="details-btn"
  onClick={() =>
    navigate(`/products/${product.id}`)
  }
>
  View Details
</button>
                   <button
  className="btn-cart"
  onClick={() => {

  dispatch(addToCart(product));

  toast.success("🛒 Product Added to Cart");

}}
>
  Add To Cart
</button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;