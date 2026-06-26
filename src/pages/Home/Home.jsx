import Navbar from "../../components/Navbar";
import "./home.css";
import { useSelector } from "react-redux";
const categories = [
  {
    name: "Mobiles",
    icon: "📱",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
  },
  {
    name: "Laptops",
    icon: "💻",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
  },
  {
    name: "Headphones",
    icon: "🎧",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    name: "Smartwatches",
    icon: "⌚",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  },
];

const featuredProducts = [
  {
    name: "Samsung Galaxy S24",
    price: "₹69,999",
    originalPrice: "₹89,999",
    discount: "22% off",
    rating: 4.5,
    reviews: 2847,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    badge: "Bestseller",
  },
  {
    name: "iPhone 15",
    price: "₹74,999",
    originalPrice: "₹99,999",
    discount: "25% off",
    rating: 4.8,
    reviews: 5124,
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    badge: "New",
  },
  {
    name: "MacBook Air M3",
    price: "₹1,14,999",
    originalPrice: "₹1,34,999",
    discount: "15% off",
    rating: 4.7,
    reviews: 1893,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    badge: "Top Rated",
  },
  {
    name: "Sony WH-1000XM5",
    price: "₹29,999",
    originalPrice: "₹39,990",
    discount: "25% off",
    rating: 4.6,
    reviews: 3210,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    badge: "Editor's Pick",
  },
];

const deals = [
  {
    name: "Sony WH-1000XM5",
    price: "₹19,999",
    originalPrice: "₹34,999",
    discount: "43%",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    timeLeft: "04:23:10",
  },
  {
    name: "Samsung Galaxy Tab",
    price: "₹34,999",
    originalPrice: "₹49,999",
    discount: "30%",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    timeLeft: "06:11:45",
  },
  {
    name: "Apple Watch SE",
    price: "₹22,999",
    originalPrice: "₹30,999",
    discount: "26%",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    timeLeft: "02:58:30",
  },
];

const whyUs = [
  { icon: "🚚", title: "Free Delivery", desc: "On orders above ₹499" },
  { icon: "🔒", title: "Secure Payment", desc: "100% protected transactions" },
  { icon: "↩", title: "Easy Returns", desc: "10-day hassle-free returns" },
  { icon: "📞", title: "24/7 Support", desc: "Always here to help you" },
];

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star filled" : "star"}>★</span>
      ))}
      <span className="rating-val">{rating}</span>
    </div>
  );
}

function Home() {

  const user = useSelector(
  (state) => state.auth.user
);
  return (
    <div className="home">
      <Navbar />

      {/* ── Hero ── */}
{/* ── Hero ── */}
<section className="hero">
  <div className="hero-inner">

    {/* ── LEFT: Content ── */}
    <div className="hero-content">

      {/* Welcome pill */}
      <div className="hero-welcome">
        <span className="hero-welcome-dot" />
        Hey, <span className="hero-welcome-name">{user?.name}</span> — great to see you back 👋
      </div>

      {/* Eyebrow */}
      <span className="hero-eyebrow">✦ New Collection 2026 ✦</span>

      {/* Main heading */}
      <h1 className="hero-heading">
        Upgrade Your<br />
        <span className="hero-accent">Tech Today</span>
      </h1>

      {/* Sub */}
      <p className="hero-sub">
        Premium Electronics — Up To <strong>50% Off</strong>.
        Smartphones, laptops, audio &amp; wearables.
      </p>

      {/* CTAs */}
      <div className="hero-actions">
        <button className="btn-primary">Shop Now →</button>
        <button className="btn-ghost">View Deals</button>
      </div>

      {/* Stats */}
      <div className="hero-stats">
        <div className="stat"><strong>50K+</strong><span>Happy Customers</span></div>
        <div className="stat-divider" />
        <div className="stat"><strong>10K+</strong><span>Products</span></div>
        <div className="stat-divider" />
        <div className="stat"><strong>4.9★</strong><span>Avg Rating</span></div>
      </div>

    </div>

    {/* ── RIGHT: Visual ── */}
    <div className="hero-visual">

      {/* Decorative ring glow */}
      <div className="hero-glow-ring" />

      {/* Floating card — top left */}
      <div className="hero-float hero-float-tl">
        <span className="hf-icon">⚡</span>
        <div>
          <strong>Flash Sale</strong>
          <p>Ends in 04:23:10</p>
        </div>
      </div>

      {/* Main product image */}
      {/* ── Animated Phone Visual (pure SVG, no external image) ── */}
<div className="hero-img-wrap hero-img-wrap--phone">
  <svg
    viewBox="0 0 480 600"
    xmlns="http://www.w3.org/2000/svg"
    className="hero-phone-svg"
    aria-label="Animated premium smartphone"
  >
    <defs>
      <linearGradient id="phoneBodyG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1a2e"/>
        <stop offset="100%" stopColor="#0f3460"/>
      </linearGradient>
      <linearGradient id="screenG" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0d1b3e"/>
        <stop offset="100%" stopColor="#0a0f2c"/>
      </linearGradient>
      <linearGradient id="purpleG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c3aed"/>
        <stop offset="100%" stopColor="#a855f7"/>
      </linearGradient>
      <linearGradient id="greenG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#3b82f6"/>
      </linearGradient>
      <linearGradient id="amberG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b"/>
        <stop offset="100%" stopColor="#ef4444"/>
      </linearGradient>
      <clipPath id="sc">
        <rect x="162" y="118" width="156" height="384" rx="4"/>
      </clipPath>
    </defs>

    <style>{`
      .ph-float { animation: phFloat 4s ease-in-out infinite; transform-origin: 240px 320px; }
      @keyframes phFloat {
        0%,100% { transform: translateY(0) rotate(-2deg); }
        50% { transform: translateY(-16px) rotate(2deg); }
      }
      .ph-ring1 { animation: phRing 3s ease-in-out infinite; transform-origin: 240px 340px; }
      .ph-ring2 { animation: phRing 3s ease-in-out infinite 0.6s; transform-origin: 240px 340px; }
      @keyframes phRing {
        0%,100% { opacity: 0.45; transform: scale(1); }
        50% { opacity: 0.15; transform: scale(1.08); }
      }
      .ph-scan { animation: phScan 3s linear infinite; }
      @keyframes phScan {
        0% { transform: translateY(-200px); opacity: 0; }
        10% { opacity: 0.35; }
        90% { opacity: 0.35; }
        100% { transform: translateY(250px); opacity: 0; }
      }
      .ph-bar1 { animation: phBar 0.8s ease-out 0.3s both; transform-origin: 178px 370px; }
      .ph-bar2 { animation: phBar 0.8s ease-out 0.5s both; transform-origin: 193px 370px; }
      .ph-bar3 { animation: phBar 0.8s ease-out 0.7s both; transform-origin: 208px 370px; }
      .ph-bar4 { animation: phBar 0.8s ease-out 0.9s both; transform-origin: 223px 370px; }
      .ph-bar5 { animation: phBar 0.8s ease-out 1.1s both; transform-origin: 238px 370px; }
      @keyframes phBar {
        from { transform: scaleY(0); } to { transform: scaleY(1); }
      }
      .ph-n1 { animation: phSlide 0.5s cubic-bezier(.34,1.56,.64,1) 0.4s both; }
      .ph-n2 { animation: phSlide 0.5s cubic-bezier(.34,1.56,.64,1) 1s both; }
      .ph-n3 { animation: phSlide 0.5s cubic-bezier(.34,1.56,.64,1) 1.6s both; }
      @keyframes phSlide {
        from { transform: translateX(60px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .ph-ping { animation: phPing 1.5s ease-in-out infinite; transform-origin: 254px 133px; }
      @keyframes phPing {
        0% { transform: scale(1); opacity: 1; }
        75%,100% { transform: scale(2); opacity: 0; }
      }
      .ph-orbit { animation: phOrbit 6s linear infinite; transform-origin: 240px 320px; }
      @keyframes phOrbit {
        from { transform: rotate(0deg); } to { transform: rotate(360deg); }
      }
      .ph-spark { animation: phSpark 5s ease-in-out infinite; }
      .ph-spark:nth-child(2) { animation-delay: 1.5s; }
      .ph-spark:nth-child(3) { animation-delay: 3s; }
      @keyframes phSpark {
        0%,100% { transform: translateY(0) scale(1); opacity: 0.8; }
        50% { transform: translateY(-15px) scale(1.4); opacity: 0.2; }
      }
      .ph-line { stroke-dasharray: 150; stroke-dashoffset: 150; animation: phLine 1.5s ease-out 1.2s forwards; }
      @keyframes phLine {
        to { stroke-dashoffset: 0; }
      }
      .ph-badge1 { animation: phB1 4s ease-in-out infinite; transform-origin: 80px 200px; }
      .ph-badge2 { animation: phB2 4s ease-in-out infinite 1s; transform-origin: 390px 430px; }
      .ph-badge3 { animation: phB3 5s ease-in-out infinite 0.5s; transform-origin: 400px 200px; }
      @keyframes phB1 {
        0%,100% { transform: translateY(0) rotate(-1deg); }
        50% { transform: translateY(-10px) rotate(1deg); }
      }
      @keyframes phB2 {
        0%,100% { transform: translateY(0) rotate(1deg); }
        50% { transform: translateY(-12px) rotate(-1deg); }
      }
      @keyframes phB3 {
        0%,100% { transform: translateY(0) rotate(-0.5deg); }
        50% { transform: translateY(-8px) rotate(0.5deg); }
      }
    `}</style>

    {/* Glow rings */}
    <ellipse className="ph-ring2" cx="240" cy="340" rx="160" ry="46" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.25"/>
    <ellipse className="ph-ring1" cx="240" cy="340" rx="120" ry="35" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.5"/>

    {/* Orbit dot */}
    <g className="ph-orbit">
      <circle cx="240" cy="110" r="4" fill="#7c3aed" opacity="0.7"/>
    </g>

    {/* Sparks */}
    <g className="ph-spark"><circle cx="90" cy="190" r="3" fill="#f59e0b" opacity="0.8"/></g>
    <g className="ph-spark"><circle cx="390" cy="160" r="2.5" fill="#7c3aed" opacity="0.8"/></g>
    <g className="ph-spark"><circle cx="400" cy="420" r="2.5" fill="#10b981" opacity="0.8"/></g>

    {/* ── PHONE ── */}
    <g className="ph-float">
      {/* Shadow */}
      <ellipse cx="240" cy="535" rx="80" ry="10" fill="#7c3aed" opacity="0.12"/>

      {/* Body */}
      <rect x="142" y="92" width="196" height="436" rx="34" fill="url(#phoneBodyG)"/>
      <rect x="142" y="92" width="3" height="436" rx="2" fill="white" fillOpacity="0.06"/>

      {/* Buttons */}
      <rect x="338" y="190" width="8" height="50" rx="4" fill="#1a1a3a"/>
      <rect x="134" y="180" width="7" height="34" rx="3.5" fill="#1a1a3a"/>
      <rect x="134" y="222" width="7" height="34" rx="3.5" fill="#1a1a3a"/>

      {/* Bezel */}
      <rect x="152" y="106" width="176" height="408" rx="26" fill="#060b1a"/>

      {/* Screen */}
      <rect x="162" y="118" width="156" height="384" rx="6" fill="url(#screenG)"/>

      {/* Scan line */}
      <rect className="ph-scan" x="162" y="118" width="156" height="2" fill="white" fillOpacity="0.04" clipPath="url(#sc)"/>

      {/* Dynamic island */}
      <rect x="210" y="122" width="60" height="16" rx="8" fill="#060b1a"/>
      <circle cx="258" cy="130" r="3.5" fill="#111827"/>

      {/* Screen content */}
      <g clipPath="url(#sc)">
        {/* Status bar */}
        <text x="172" y="150" fontFamily="sans-serif" fontSize="7.5" fill="white" fillOpacity="0.9" fontWeight="600">9:41</text>
        <rect x="292" y="143" width="3" height="5" rx="1" fill="white"/>
        <rect x="297" y="141" width="3" height="7" rx="1" fill="white"/>
        <rect x="302" y="139" width="3" height="9" rx="1" fill="white"/>
        <rect x="308" y="140" width="14" height="8" rx="2" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.6"/>
        <rect x="309.5" y="141.5" width="9" height="5" rx="1.5" fill="#10b981"/>

        {/* Ping */}
        <circle className="ph-ping" cx="254" cy="133" r="3" fill="#10b981" fillOpacity="0.4"/>
        <circle cx="254" cy="133" r="2" fill="#10b981"/>

        {/* Hero banner */}
        <rect x="170" y="162" width="142" height="72" rx="10" fill="#1a1040"/>
        <rect x="170" y="162" width="142" height="72" rx="10" fill="#7c3aed" fillOpacity="0.28"/>
        <text x="181" y="180" fontFamily="sans-serif" fontSize="7" fill="#c4b5fd" fontWeight="700" letterSpacing="1">FLASH SALE</text>
        <text x="181" y="197" fontFamily="sans-serif" fontSize="13" fill="white" fontWeight="800">UP TO 50% OFF</text>
        <text x="181" y="211" fontFamily="sans-serif" fontSize="7" fill="#a78bfa">Premium Electronics</text>
        <rect x="277" y="168" width="30" height="58" rx="8" fill="white" fillOpacity="0.06"/>

        {/* Timer pill */}
        <rect x="181" y="215" width="75" height="14" rx="7" fill="#7c3aed"/>
        <text x="218" y="225" fontFamily="sans-serif" fontSize="6.5" fill="white" fontWeight="700" textAnchor="middle">⏱ 04:23:10 left</text>

        {/* Category label */}
        <text x="170" y="252" fontFamily="sans-serif" fontSize="7" fill="white" fillOpacity="0.45" fontWeight="600" letterSpacing="0.5">CATEGORIES</text>

        {/* App icons */}
        <rect x="170" y="257" width="28" height="28" rx="8" fill="url(#amberG)"/>
        <text x="184" y="276" fontFamily="sans-serif" fontSize="13" textAnchor="middle" fill="white">📱</text>
        <rect x="203" y="257" width="28" height="28" rx="8" fill="url(#purpleG)"/>
        <text x="217" y="276" fontFamily="sans-serif" fontSize="13" textAnchor="middle" fill="white">💻</text>
        <rect x="236" y="257" width="28" height="28" rx="8" fill="url(#greenG)"/>
        <text x="250" y="276" fontFamily="sans-serif" fontSize="13" textAnchor="middle" fill="white">🎧</text>
        <rect x="269" y="257" width="28" height="28" rx="8" fill="url(#amberG)"/>
        <text x="283" y="276" fontFamily="sans-serif" fontSize="13" textAnchor="middle" fill="white">⌚</text>

        {/* Trending label */}
        <text x="170" y="305" fontFamily="sans-serif" fontSize="7" fill="white" fillOpacity="0.45" fontWeight="600" letterSpacing="0.5">TRENDING</text>

        {/* Bar chart */}
        <rect className="ph-bar1" x="172" y="312" width="10" height="18" rx="2" fill="#7c3aed" fillOpacity="0.6"/>
        <rect className="ph-bar2" x="186" y="305" width="10" height="25" rx="2" fill="#7c3aed" fillOpacity="0.8"/>
        <rect className="ph-bar3" x="200" y="309" width="10" height="21" rx="2" fill="#a855f7"/>
        <rect className="ph-bar4" x="214" y="298" width="10" height="32" rx="2" fill="#7c3aed"/>
        <rect className="ph-bar5" x="228" y="302" width="10" height="28" rx="2" fill="#c084fc"/>
        <polyline className="ph-line" points="177,327 191,320 205,323 219,312 233,316" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Notifications */}
        <g className="ph-n1">
          <rect x="169" y="340" width="142" height="34" rx="8" fill="white" fillOpacity="0.07"/>
          <circle cx="182" cy="357" r="8" fill="url(#purpleG)"/>
          <text x="182" y="361" fontFamily="sans-serif" fontSize="9" textAnchor="middle" fill="white">🛒</text>
          <text x="196" y="353" fontFamily="sans-serif" fontSize="7" fill="white" fontWeight="600">Order Confirmed</text>
          <text x="196" y="365" fontFamily="sans-serif" fontSize="6" fill="white" fillOpacity="0.5">iPhone 15 Pro — ₹89,999</text>
        </g>
        <g className="ph-n2">
          <rect x="169" y="378" width="142" height="34" rx="8" fill="white" fillOpacity="0.05"/>
          <circle cx="182" cy="395" r="8" fill="url(#greenG)"/>
          <text x="182" y="399" fontFamily="sans-serif" fontSize="9" textAnchor="middle" fill="white">⭐</text>
          <text x="196" y="391" fontFamily="sans-serif" fontSize="7" fill="white" fontWeight="600">New Review</text>
          <text x="196" y="403" fontFamily="sans-serif" fontSize="6" fill="white" fillOpacity="0.5">4.9★ — "Amazing quality!"</text>
        </g>
        <g className="ph-n3">
          <rect x="169" y="416" width="142" height="34" rx="8" fill="white" fillOpacity="0.04"/>
          <circle cx="182" cy="433" r="8" fill="url(#amberG)"/>
          <text x="182" y="437" fontFamily="sans-serif" fontSize="9" textAnchor="middle" fill="white">🚚</text>
          <text x="196" y="429" fontFamily="sans-serif" fontSize="7" fill="white" fontWeight="600">Shipped!</text>
          <text x="196" y="441" fontFamily="sans-serif" fontSize="6" fill="white" fillOpacity="0.5">Delivery by tomorrow 6 PM</text>
        </g>

        {/* Home bar */}
        <rect x="210" y="490" width="60" height="4" rx="2" fill="white" fillOpacity="0.25"/>
      </g>
    </g>

    {/* ── Floating Badge Cards ── */}
    <g className="ph-badge1">
      <rect x="10" y="166" width="128" height="50" rx="14" fill="#0f0a2e" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.6"/>
      <rect x="10" y="166" width="128" height="50" rx="14" fill="#7c3aed" fillOpacity="0.1"/>
      <rect x="22" y="178" width="26" height="26" rx="8" fill="url(#amberG)"/>
      <text x="35" y="196" fontFamily="sans-serif" fontSize="13" textAnchor="middle" fill="white">⚡</text>
      <text x="56" y="186" fontFamily="sans-serif" fontSize="8.5" fill="white" fontWeight="700">Flash Sale</text>
      <text x="56" y="200" fontFamily="sans-serif" fontSize="7.5" fill="#c4b5fd">04:23:10 left</text>
    </g>

    <g className="ph-badge2">
      <rect x="342" y="406" width="130" height="50" rx="14" fill="#0a1a0f" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5"/>
      <rect x="342" y="406" width="130" height="50" rx="14" fill="#10b981" fillOpacity="0.08"/>
      <rect x="354" y="418" width="26" height="26" rx="8" fill="url(#greenG)"/>
      <text x="367" y="436" fontFamily="sans-serif" fontSize="13" textAnchor="middle" fill="white">🚚</text>
      <text x="390" y="428" fontFamily="sans-serif" fontSize="8.5" fill="white" fontWeight="700">Free Shipping</text>
      <text x="390" y="442" fontFamily="sans-serif" fontSize="7.5" fill="#6ee7b7">On orders ₹499+</text>
    </g>

    <g className="ph-badge3">
      <rect x="352" y="140" width="116" height="42" rx="14" fill="#1a0f00" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5"/>
      <rect x="352" y="140" width="116" height="42" rx="14" fill="#f59e0b" fillOpacity="0.08"/>
      <text x="368" y="160" fontFamily="sans-serif" fontSize="13" fill="#fbbf24">⭐</text>
      <text x="386" y="158" fontFamily="sans-serif" fontSize="12" fill="white" fontWeight="800">4.9</text>
      <text x="386" y="172" fontFamily="sans-serif" fontSize="7" fill="#fcd34d">50K+ reviews</text>
    </g>
  </svg>
</div>

      {/* Floating card — bottom right */}
      <div className="hero-float hero-float-br">
        <span className="hf-icon">🚚</span>
        <div>
          <strong>Free Shipping</strong>
          <p>On orders ₹499+</p>
        </div>
      </div>

      {/* Floating mini badge */}
      <div className="hero-float hero-float-mid">
        <span>🔒</span> Secure Payment
      </div>

    </div>

  </div>
</section>


      {/* ── Trust Bar ── */}
      <div className="trust-bar">
        {whyUs.map((w) => (
          <div className="trust-item" key={w.title}>
            <span className="trust-icon">{w.icon}</span>
            <div>
              <strong>{w.title}</strong>
              <p>{w.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Categories ── */}
      <section className="section categories-section">
        <div className="section-header">
          <h2>Shop By Category</h2>
        
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <div className="category-card" key={cat.name}>
              <div className="category-img-wrap">
                <img src={cat.img} alt={cat.name} />
                <div className="category-overlay" />
              </div>
              <div className="category-label">
                <span className="cat-icon">{cat.icon}</span>
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          
        </div>
        <div className="product-grid">
          {featuredProducts.map((p) => (
            <div className="product-card" key={p.name}>
              {p.badge && <span className="product-badge">{p.badge}</span>}
              <div className="product-img-wrap">
                <img src={p.img} alt={p.name} />
                <div className="product-actions-overlay">
                 
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <StarRating rating={p.rating} />
                <p className="review-count">({p.reviews.toLocaleString()} reviews)</p>
                <div className="product-pricing">
                  <span className="product-price">{p.price}</span>
                  <span className="product-original">{p.originalPrice}</span>
                  <span className="product-discount">{p.discount}</span>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Deals of the Day ── */}
      <section className="section deals-section">
        <div className="section-header">
          <h2>⚡ Deals of the Day</h2>
          
        </div>
        <div className="deals-grid">
          {deals.map((d) => (
            <div className="deal-card" key={d.name}>
              <div className="deal-discount-badge">{d.discount}% OFF</div>
              <div className="deal-img-wrap">
                <img src={d.img} alt={d.name} />
              </div>
              <div className="deal-info">
                <h3>{d.name}</h3>
                <div className="deal-pricing">
                  <span className="deal-price">{d.price}</span>
                  <span className="deal-original">{d.originalPrice}</span>
                </div>
                <div className="deal-timer">
                  <span className="timer-label">⏰ Ends in</span>
                  <span className="timer-value">{d.timeLeft}</span>
                </div>
                <div className="deal-progress-wrap">
                  <div className="deal-progress-bar" style={{ width: `${parseInt(d.discount) + 30}%` }} />
                </div>
                <p className="deal-sold-text">🔥 Selling fast</p>
                <button className="btn-deal">Grab Deal</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter Banner ── */}
      <section className="newsletter-section">
        <div className="newsletter-inner">
          <div>
            <h2>Get Exclusive Deals First</h2>
            <p>Subscribe and save up to ₹2,000 on your first order.</p>
          </div>
          
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3 className="footer-logo">⚡ TechStore</h3>
            <p>Your one-stop destination for premium electronics at unbeatable prices.</p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Products</li>
              <li>Wishlist</li>
              <li>Cart</li>
              <li>My Account</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li>Mobiles</li>
              <li>Laptops</li>
              <li>Headphones</li>
              <li>Smartwatches</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© Ecommerce 2026 · All rights reserved.</p>
          
        </div>
      </footer>
    </div>
  );
}

export default Home;
