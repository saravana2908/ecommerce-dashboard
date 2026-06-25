import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth/authSlice";
import { setSearchText } from "../features/search/searchSlice";

import {
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaHome,
} from "react-icons/fa";

import "./Navbar.css";

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchText = useSelector(
    (state) => state.search.searchText
  );

  const wishlistCount = useSelector(
  (state) => state.wishlist.items.length
);

const cartCount = useSelector(
  (state) => state.cart.items.length
);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  

  return (
    <nav className="navbar">

      {/* Logo & Dashboard */}

      <div className="brand-section">

        <div className="brand-name">
          Ecommerce
        </div>

        <Link
          to="/home"
          className="dashboard-link"
        >
          <FaHome className="dashboard-icon" />
          <span>Dashboard</span>
        </Link>

      </div>

      {/* Search */}

      <div className="navbar-search">

        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) =>
            dispatch(
              setSearchText(e.target.value)
            )
          }
        />

        <button>
          <FaSearch />
        </button>

      </div>

      {/* Right Side */}

      <div className="navbar-icons">

        <Link
          to="/products"
          className="products-link"
        >
          Products
        </Link>

        <Link
  to="/wishlist"
  className="nav-icon"
>
  <FaHeart />

  {wishlistCount > 0 && (
    <span className="icon-badge">
      {wishlistCount}
    </span>
  )}
</Link>

       <Link
  to="/cart"
  className="nav-icon"
>
  <FaShoppingCart />

  {cartCount > 0 && (
    <span className="icon-badge">
      {cartCount}
    </span>
  )}
</Link>

        <Link to="/profile">
          <FaUserCircle />
        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;