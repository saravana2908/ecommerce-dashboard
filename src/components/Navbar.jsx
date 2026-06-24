import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

import {
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaHome,
} from "react-icons/fa";

import "./Navbar.css";
import { useSelector } from "react-redux";

import {
setSearchText
}
from "../features/search/searchSlice";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const searchText = useSelector(
(state)=>state.search.searchText
);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="brand-section">

  <div className="brand-name">
    Ecommerce
  </div>

  <Link to="/home" className="dashboard-link">
    <FaHome className="dashboard-icon" />
    <span>Dashboard</span>
  </Link>

</div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />

        <button>
          <FaSearch />
        </button>
      </div>

      <div className="navbar-icons">
        
        <Link to="/products" className="products-link">
  Products
</Link>
        <Link to="/wishlist">
          <FaHeart />
        </Link>

        <Link to="/cart">
          <FaShoppingCart />
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