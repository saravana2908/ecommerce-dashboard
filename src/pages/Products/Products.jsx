import { useGetProductsQuery } from "../../services/api";
import "./Products.css";
import Navbar from "../../components/Navbar";
import { useState } from "react";
function Products() {
  const { data, isLoading, error } = useGetProductsQuery();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 6;
const [category, setCategory] = useState("All");
  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error</h2>;
const filteredProducts = data?.filter((product) => {
  const matchesSearch = product.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" ||
    product.category === category;

  return matchesSearch && matchesCategory;
}) || [];

const lastProductIndex = currentPage * productsPerPage;

const firstProductIndex =
  lastProductIndex - productsPerPage;

const currentProducts =
  filteredProducts.slice(
    firstProductIndex,
    lastProductIndex
  );

 return (
  <div className="products-container">
    <Navbar />
    <h1>Products</h1>
    <input
  type="text"
  placeholder="Search Products..."
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }}
/>

<select
  value={category}
  onChange={(e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  }}
>
  <option value="All">All</option>
  <option value="Mobile">Mobile</option>
  <option value="Laptop">Laptop</option>
  <option value="Headphones">Headphones</option>
  <option value="Smartwatch">Smartwatch</option>
</select>

    <div className="products-grid">
      {currentProducts?.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />

          <h3>{product.title}</h3>

          <p>{product.category}</p>

          <p>₹ {product.price}</p>

          <button>View Details</button>

          <button>Wishlist</button>

          <button>Add Cart</button>
        </div>
      ))}
    </div>

    <div className="pagination">
  {[...Array(
    Math.ceil(
      filteredProducts.length /
      productsPerPage
    )
  )].map((_, index) => (
    <button
      key={index}
      onClick={() =>
        setCurrentPage(index + 1)
      }
    >
      {index + 1}
    </button>
  ))}
</div>

  </div>
);
}

export default Products;