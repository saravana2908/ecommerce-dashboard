import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav>
      <h2>Ecommerce Dashboard</h2>

      <Link to="/home">Home</Link> |{" "}
      <Link to="/products">Products</Link> |{" "}
      <Link to="/wishlist">Wishlist</Link> |{" "}
      <Link to="/cart">Cart</Link> |{" "}
      <Link to="/profile">Profile</Link> |{" "}
      
      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;