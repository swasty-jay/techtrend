import { useQuery } from "@tanstack/react-query";
import { fetchAppleProducts } from "../Services/Api";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice";

function AppleProducts() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, id: Date.now() })); // Unique ID using timestamp
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["appleProducts"],
    queryFn: fetchAppleProducts,
  });

  if (isLoading)
    return (
      <p className="text-center text-gray-600 pt-11">Loading products...</p>
    );
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <section className="max-w-7xl mx-auto mt-16 px-4 pb-20">
      <h2 className="text-3xl font-bold text-center mb-8">Apple Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              brand={product.brand}
              price={`GHS${product.price}`}
              image={product.image_url}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>
    </section>
  );
}

export default AppleProducts;
