import { useQuery } from "@tanstack/react-query";
import { fetchAppleProducts } from "../Services/Api";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice";
import ProductSkeleton from "../UI/ProductSkeleton";

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
  // console.log(products);
  if (error) {
    return (
      <p className="text-red-500 border-red-500 text-center">
        Error: {error.message}
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-16  pb-20">
      <h2 className="text-3xl font-bold text-center mb-8">Apple Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
        {isLoading ? (
          Array(4) // Show 4 skeletons while loading
            .fill(0)
            .map((_, index) => <ProductSkeleton key={index} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              oldPrice={product.oldPrice}
              title={product.title}
              discount={product.discount}
              rating={product.rating}
              is_active={product.is_active}
              price={`GHS${Number(product.price)}`}
              image={product.image_url}
              quantity={product.quantity}
              maxQuantity={20}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}

export default AppleProducts;
