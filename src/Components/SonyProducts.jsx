import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice";
import ProductSkeleton from "../UI/ProductSkeleton";
import { fetchPlaystationProducts } from "../Services/Api";
function SonyProducts() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, id: Date.now() })); // Unique ID using timestamp
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["samsungProducts"],
    queryFn: fetchPlaystationProducts,
  });
  // console.log(products);

  if (error) {
    return <p className="text-red-500 text-center"> {error.message}</p>;
  }

  return (
    <section className="max-w-7xl mx-auto mt-16 px-4 pb-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Playstation products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {isLoading ? (
          Array(4)
            .fill(0)
            .map((_, index) => <ProductSkeleton key={index} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              oldPrice={product.oldPrice}
              name={product.name}
              discount={product.discount}
              rating={product.rating}
              price={`GHS${Number(product.price)}`}
              image={product.image_url}
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

export default SonyProducts;
