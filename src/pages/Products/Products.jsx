import { useGetProductsQuery } from "../../services/api";

function Products() {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error</h2>;

  return (
    <div>
      <h1>Products</h1>

      {data?.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>₹ {product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;