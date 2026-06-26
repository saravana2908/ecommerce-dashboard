import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth/authSlice";
import { setSearchText } from "../features/search/searchSlice";
import { toggleTheme } from "../features/themecolor/themeSlice";

import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaHome,
  FaUserCircle,
  FaCog,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Navbar.css";

function Navbar() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const searchText   = useSelector((state) => state.search.searchText);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount     = useSelector((state) => state.cart.items.length);
  const user          = useSelector((state) => state.auth.user);
  const themeMode     = useSelector((state) => state.theme.mode);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect(() => {
  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  // Get initials for avatar
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

    
  return (
    <nav className="navbar">

      {/* ── Brand ── */}
      <div className="brand-section">
        <div className="brand-name">Ecommerce</div>
        <Link to="/home" className="dashboard-link">
          <FaHome className="dashboard-icon" />
          <span>Dashboard</span>
        </Link>
      </div>

      {/* ── Search ── */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
        <button><FaSearch /></button>
      </div>

      {/* ── Right icons ── */}
      <div className="navbar-icons">


<div
  className={
    isOnline
      ? "network-status online"
      : "network-status offline"
  }
>
  {isOnline ? "🟢 Online" : "🔴 Offline"}
</div>
        <Link to="/products" className="products-link">Products</Link>

        <Link to="/wishlist" className="nav-icon">
          <FaHeart />
          {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
        </Link>

        <Link to="/cart" className="nav-icon">
          <FaShoppingCart />
          {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
        </Link>

        {/* ── Settings avatar ── */}
        <div className="settings-wrapper" ref={dropdownRef}>
          <button
            className="avatar-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="Open settings"
          >
            <span className="avatar-initials">{initials}</span>
            <FaCog className="avatar-cog" />
          </button>

          {dropdownOpen && (
            <div className="settings-dropdown">

              {/* User info */}
              <div className="dropdown-user">
                <div className="dropdown-avatar">{initials}</div>
                <div>
                  <p className="dropdown-name">{user?.name || "User"}</p>
                  <p className="dropdown-email">{user?.email || ""}</p>
                </div>
              </div>

              <div className="dropdown-divider" />

              {/* Profile */}
              <button
                className="dropdown-item"
                onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
              >
                <FaUserCircle className="dropdown-icon" />
                My Profile
              </button>

              {/* Theme toggle */}
              <button className="dropdown-item" onClick={handleTheme}>
                {themeMode === "dark"
                  ? <><FaSun className="dropdown-icon sun" />Light Mode</>
                  : <><FaMoon className="dropdown-icon moon" />Dark Mode</>
                }
                <span className="theme-badge">
                  {themeMode === "dark" ? "ON" : "OFF"}
                </span>
              </button>

              <div className="dropdown-divider" />

              {/* Logout */}
              <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                <FaSignOutAlt className="dropdown-icon" />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
