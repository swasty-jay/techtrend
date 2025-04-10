import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAppleProducts,
  fetchSamsungProducts,
  fetchPlaystationProducts,
} from "../Services/Api";
import { FaStar } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import NotFound from "./../UI/NotFound";
import { motion } from "framer-motion";
import Breadcrumb from "../UI/BreadCrumb";
import Spinner from "../UI/Spinner";

function ProductDetails() {
  const dispatch = useDispatch();
  const { brand, id } = useParams();
  const [quantity, setQuantity] = React.useState(1);
  //////// FECTCH FUNTIONS////////////
  const fetchProducts = async () => {
    if (brand === "apple") return await fetchAppleProducts();
    if (brand === "samsung") return await fetchSamsungProducts();
    if (brand === "Playstation") return await fetchPlaystationProducts();
    return [];
  };

  ///////////REACT QUERY//////////
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: [brand, id],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error) return <p className="text-red-500 text-center">{error.message}</p>;

  const product = products.find((p) => String(p.id) === id);
  if (!["apple", "samsung", "Playstation"].includes(brand) || !product)
    return <NotFound />;

  const handleAddToCart = () => {
    const updatedProduct = {
      id: product.id,
      name: product.title,
      image: product.image_url,
      price: product.price,
      quantity,
    };

    dispatch(addToCart(updatedProduct));
    toast.success("Added to cart!");
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Toaster position="top-center" />

      {/* Breadcrumb */}
      {/* <nav className="mb-6 text-xs sm:text-sm text-gray-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link to={`/${brand}`} className="hover:underline capitalize">
          {brand}
        </Link>{" "}
        / <span className="text-black font-medium">{product.title}</span>
      </nav> */}

      <Breadcrumb
        paths={[
          { label: "Home", to: "/" },
          // { label: brand, to: `/${brand}` },
          { label: product.title },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left: Images */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full aspect-square  border rounded-lg border-gray-300  overflow-hidden">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-16 sm:w-20 h-16 sm:h-20 border rounded border-gray-400 hover:border-gray-500 transition"
              >
                <img
                  src={product.image_url}
                  alt="Thumbnail"
                  className="w-full h-full object-contain cursor-pointer"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div
          className="w-full lg:w-1/2 space-y-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold">{product.title}</h2>

          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <div className="flex text-yellow-400">
              {Array(Math.round(product.rating || 4))
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
            </div>
            <span className="text-gray-500">(500 Reviews)</span>
            <span className="text-green-600 font-medium ml-2">
              {product.is_active ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-xl sm:text-2xl font-bold text-gray-800">
            GHS{Number(product.price)}
          </p>

          <p className="text-gray-600 text-sm sm:text-base">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-4 text-sm sm:text-base">
            <span>Quantity:</span>
            <button
              onClick={() => handleQuantityChange(-1)}
              className="border px-3 py-1 rounded border-gray-300"
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="border px-3 py-1 rounded border-gray-300"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-wrap gap-4 mt-6">
            <motion.button
              whileTap={product.is_active ? { scale: 0.95 } : {}}
              onClick={() => {
                if (!product.is_active) return;
                handleAddToCart();
              }}
              className={`px-6 py-2 rounded transition text-sm sm:text-base text-white ${
                product.is_active
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-red-400 cursor-not-allowed opacity-50"
              }`}
              disabled={!product.is_active}
            >
              {product.is_active ? "Add to Cart" : "Out of Stock"}
            </motion.button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <div className="border p-3 rounded border-gray-400">
              <p className="font-medium">🚚 Free Delivery</p>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
            <div className="border p-3 rounded border-gray-400">
              <p className="font-medium">↩️ Return Delivery</p>
              <p>Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductDetails;
