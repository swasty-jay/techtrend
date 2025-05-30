import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice";
import ProductSkeleton from "../UI/ProductSkeleton";
import { fetchPlaystationProducts } from "../Services/Api";
import Error from "../UI/Error";
function PlaystationProducts() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, id: Date.now() })); // Unique ID using timestamp
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["playstationProducts"],
    queryFn: fetchPlaystationProducts,
  });
  // console.log(products);

  if (error) {
    return (
      <h3 className="text-red-500 text-center">
        {" "}
        <Error>
          <p>Failed to fetch products. please try again</p>
        </Error>
      </h3>
    );
  }

  return (
    <section className="max-w-7xl mx-auto my-1  pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {isLoading ? (
          Array(4)
            .fill(0)
            .map((_, index) => <ProductSkeleton key={index} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              brand={product.brand}
              oldPrice={product.oldPrice}
              title={product.title}
              discount={product.discount}
              rating={product.rating}
              is_active={product.is_active}
              price={product.price}
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

export default PlaystationProducts;
