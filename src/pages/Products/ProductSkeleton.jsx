import "./ProductSkeleton.css";

function ProductSkeleton() {
  return (
    <div className="product-card skeleton-card">
      <div className="skeleton skeleton-image"></div>

      <div className="card-body">
        <div className="skeleton skeleton-category"></div>

        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-rating"></div>

        <div className="skeleton skeleton-price"></div>

        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;