import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Store/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CartCheckout({ onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/CheckoutForm"); // Navigate to checkout page
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-slate-50/10 backdrop-blur-sm bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white w-full sm:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {cartItems.length > 0 ? (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-blue-600">{item.price}</p>
                  <p className="text-blue-600">{item.description}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold">
            Total: GHS {totalPrice.toFixed(2)}
          </span>
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950"
            onClick={handleCheckout} // Navigate to the checkout page
          >
            Checkout
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default CartCheckout;
