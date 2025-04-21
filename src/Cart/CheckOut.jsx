import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../Store/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import Animation from "../assets/Animation.json";
import Breadcrumb from "../UI/BreadCrumb";

function CheckOut() {
  const cartItems = useSelector((state) => {
    const uniqueItems = [];
    const seen = new Set();

    state.cart.items.forEach((item) => {
      if (!seen.has(item.id)) {
        uniqueItems.push(item);
        seen.add(item.id);
      }
    });

    return uniqueItems;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, Number(value));
    dispatch(updateQuantity({ id, quantity }));
    toast.success("Quantity updated");
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    // toast.success("Proceeding to checkout...");
    navigate("/CheckoutForm");
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-gray-200 to-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Toaster position="top-center" />
        <Breadcrumb
          paths={[
            { label: "Home", to: "/" },
            { label: "Cart", to: "/checkOut" },
          ]}
        />
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Shopping Cart
        </motion.h2>

        {cartItems.length > 0 ? (
          <>
            {/* Desktop Table */}
            <motion.div
              className="overflow-x-auto hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                <thead className="text-left text-gray-600 uppercase text-sm bg-gray-100">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-b-gray-300 hover:bg-gray-50"
                    >
                      <td className="flex items-center gap-4 p-4">
                        <button
                          className="text-red-500 hover:text-red-700 text-lg"
                          onClick={() => handleRemove(item.id)}
                        >
                          &times;
                        </button>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <span className="font-medium">{item.name}</span>
                      </td>
                      <td className="p-4">GHS{item.price}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          className="w-16 border border-gray-300 px-2 py-1 rounded"
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                        />
                      </td>
                      <td className="p-4 font-semibold">
                        GHS{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Mobile Cards */}
            <motion.div
              className="space-y-4 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-md p-4 shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-red-500 text-lg"
                        onClick={() => handleRemove(item.id)}
                      >
                        &times;
                      </button>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </div>
                    <div className="font-medium">{item.name}</div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>Price:</span>
                    <span>GHS{item.price}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Quantity:</span>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      className="w-16 border px-2 py-1 rounded"
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                    />
                  </div>
                  <div className="flex justify-between text-sm font-semibold mt-1">
                    <span>Subtotal:</span>
                    <span>GHS{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              className="flex flex-col lg:flex-row justify-between gap-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Left side - Buttons and Coupon */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate("/")}
                    className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
                  >
                    Return To Shop
                  </button>
                  <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100">
                    Update Cart
                  </button>
                </div>
                {/* 
                <div className="flex flex-wrap gap-4">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="border px-3 py-2 rounded flex-1"
                  />
                  <button
                    onClick={() => toast.success("Coupon applied!")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Apply Coupon
                  </button>
                </div> */}
              </div>

              {/* Right side - Total */}
              <div className="w-full lg:w-1/3 border border-gray-500 rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
                <div className="flex justify-between py-2 border-b border-b-gray-400">
                  <span>Subtotal:</span>
                  <span>GHS{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-b-gray-400">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between py-2 font-bold">
                  <span>Total:</span>
                  <span>GHS{totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Lottie animationData={Animation} loop autoplay className="w-60" />
            <p className="text-center text-gray-500 text-lg mt-4">
              Your cart is empty.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded border-gray-400 hover:bg-gray-700"
            >
              Return to Shop
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default CheckOut;
