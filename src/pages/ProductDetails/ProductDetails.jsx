import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useGetProductByIdQuery } from "../../services/api";
import "./ProductDetails.css";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";
function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error Loading Product</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="product-details-container">

        {/* Product Image */}

        <div className="product-image-section">

          <div className="image-wrapper">

           <div
  className={`details-wishlist ${
    wishlistItems.some(
      (item) => item.id === product.id
    )
      ? "details-wishlist--active"
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
    } else {
      dispatch(
        addToWishlist(product)
      );
    }
  }}
>
  {wishlistItems.some(
    (item) => item.id === product.id
  )
    ? "♥"
    : "♡"}
</div>

            <img
              src={product.image}
              alt={product.title}
            />

          </div>

        </div>

        {/* Product Info */}

        <div className="product-info-section">

          <h1>{product.title}</h1>

          <div className="product-rating">
            ⭐ {product.rating || 4.0}
            <span>
              {" "}
              ({product.reviews || 0} Reviews)
            </span>
          </div>

          <div className="product-price">

            <span className="current-price">
              ₹ {(product.price || 0)
                .toLocaleString("en-IN")}
            </span>

            <span className="old-price">
              ₹ {(
                product.oldPrice ||
                product.price ||
                0
              ).toLocaleString("en-IN")}
            </span>

          </div>

          <p className="stock-status">
            🟢 In Stock
          </p>

          <p className="product-description">
            {product.description}
          </p>

          <div className="action-buttons">

           <button
  className="btn-cart"
  onClick={() =>
    dispatch(addToCart(product))
  }
>
  Add To Cart
</button>

          </div>

          {/* Trust Badges */}

          <div className="trust-badges">

            <span>
              🚚 Free Delivery
            </span>

            <span>
              🔒 Secure Payment
            </span>

            <span>
              ↩ Easy Returns
            </span>

          </div>

          {/* Specifications */}

          <div className="specifications">

            <h3>
              Specifications
            </h3>

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {product.rating}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              {product.stock}
            </p>

            <p>
              <strong>Discount:</strong>{" "}
              {product.discount}%
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;