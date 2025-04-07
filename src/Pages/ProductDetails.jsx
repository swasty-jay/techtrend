import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAppleProducts } from "../Services/Api";
import { FaStar } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appleProducts"],
    queryFn: fetchAppleProducts,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error.message}</p>;

  const product = products.find((p) => String(p.id) === id);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, id: Date.now() }));
    toast.success("Added to cart!");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <Toaster position="top-center" />
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Image Thumbnails */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full aspect-square bg-white border rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex gap-4 justify-center">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-20 h-20 border rounded hover:border-red-500 transition"
              >
                <img
                  src={product.image_url}
                  alt="Thumbnail"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold">{product.title}</h2>

          <div className="flex items-center gap-2">
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

          <p className="text-2xl font-bold text-gray-800">
            GHS{Number(product.price)}
          </p>

          <p className="text-gray-600">
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble-free install & mess-free removal. Pressure
            sensitive.
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-4">
            <span>Quantity:</span>
            <button className="border px-3 py-1 rounded">-</button>
            <span className="font-semibold">{product.quantity || 1}</span>
            <button className="border px-3 py-1 rounded">+</button>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            >
              Add to Cart
            </button>
          </div>

          {/* Extra Info */}
          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <div className="border p-3 rounded">
              <p className="font-medium">🚚 Free Delivery</p>
              <p>Enter your postal code for Delivery Availability</p>
            </div>
            <div className="border p-3 rounded">
              <p className="font-medium">↩️ Return Delivery</p>
              <p>Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
