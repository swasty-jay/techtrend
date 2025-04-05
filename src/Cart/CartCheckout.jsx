import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../Store/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import Animation from "../assets/animation.json";
import { useEffect, useRef } from "react";

function CartCheckout({ onClose }) {
  const modalRef = useRef();

  // Handle click outside to close
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const cartItems = useSelector((state) => {
    const uniqueItems = [];
    const seen = new Set();

    // Ensure no duplicates — only unique items based on ID
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
    toast.success("Proceeding to checkout...");
    navigate("/CheckoutForm");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-stone-900/5 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50 px-4"
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div
        ref={modalRef}
        className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg relative"
      >
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cartItems.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full hidden md:table">
                <thead className="text-left text-gray-500 uppercase text-sm">
                  <tr>
                    <th className="p-2">Product</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="bg-white shadow text-sm">
                      <td className="flex items-center gap-4 p-4">
                        <button
                          className="text-red-500 hover:text-red-700 text-lg"
                          onClick={() => handleRemove(item.id)}
                        >
                          X
                        </button>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded"
                        />
                        <span className="font-medium">{item.name}</span>
                      </td>
                      <td className="p-4">${item.price}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          className="w-16 border px-2 py-1 rounded"
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                        />
                      </td>
                      <td className="p-4 font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="space-y-4 md:hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow-md rounded-md p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-red-500 text-lg"
                          onClick={() => handleRemove(item.id)}
                        >
                          X
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
                      <span>${item.price}</span>
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
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions + Total */}
            <div className="flex flex-col lg:flex-row justify-between gap-6 mt-8">
              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={onClose}
                    className="border px-4 py-2 rounded hover:bg-gray-100 w-full sm:w-auto"
                  >
                    Return To Shop
                  </button>
                  <button className="border px-4 py-2 rounded hover:bg-gray-100 w-full sm:w-auto">
                    Update Cart
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 mt-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="border px-3 py-2 rounded w-full sm:w-auto flex-1"
                  />
                  <button
                    onClick={() => toast.success("Coupon applied!")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-1/3 border rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
                <div className="flex justify-between py-2 border-b">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between py-2 font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Lottie
              animationData={Animation}
              loop
              autoplay
              className="w-[300px] h-[300px]"
            />

            <p className="text-center text-gray-500 text-lg mt-4">
              Your cart is empty.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Return to Shop
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default CartCheckout;
