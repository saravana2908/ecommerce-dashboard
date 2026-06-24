import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

import "./Profile.css";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  return (
    <>
      <Navbar />

      <div className="profile-container">

        {/* Hero Section */}

        <div className="profile-hero">

          <FaUserCircle className="profile-avatar" />

          <h1>
            Welcome Back,
            <span> {user?.name}</span> 👋
          </h1>

          <p>
            Manage your account and keep track of
            your shopping activity.
          </p>

        </div>

        {/* Profile Layout */}

        <div className="profile-grid">

          {/* Personal Information */}

          <div className="profile-card">

            <h2>Personal Information</h2>

            <div className="info-row">
              <FaUserCircle className="info-icon" />

              <div>
                <span>Full Name</span>

                <h4>{user?.name}</h4>
              </div>
            </div>

            <div className="info-row">
              <FaEnvelope className="info-icon" />

              <div>
                <span>Email Address</span>

                <h4>{user?.email}</h4>
              </div>
            </div>

            <div className="info-row">
              <FaPhone className="info-icon" />

              <div>
                <span>Phone Number</span>

                <h4>{user?.phone || "Not Available"}</h4>
              </div>
            </div>

          </div>

          {/* Account Overview */}

          <div className="profile-card">

            <h2>Account Overview</h2>

            <div className="overview-card">

              <FaHeart className="overview-icon" />

              <div>
                <h3>{wishlistItems.length}</h3>

                <p>Wishlist Items</p>
              </div>

            </div>

            <div className="overview-card">

              <FaShoppingCart className="overview-icon" />

              <div>
                <h3>{cartItems.length}</h3>

                <p>Cart Items</p>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="profile-footer">

          <h2>
            Thank You,
            <span> {user?.name}</span> ❤️
          </h2>

          <p>
            Thank you for choosing our Ecommerce Dashboard.
            We hope you enjoy a smooth and secure shopping experience.
          </p>

        </div>

      </div>
    </>
  );
}

export default Profile;