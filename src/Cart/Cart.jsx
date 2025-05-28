import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import CartCheckout from "./CartCheckOut";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Calculate total items in cart
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="relative cursor-pointer" onClick={() => setShowCart(true)}>
      <FaShoppingCart className="text-gray-700 hover:text-blue-600 text-2xl" />
      {totalCartItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalCartItems}
        </span>
      )}
      {showCart && <CartCheckout onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default Cart;
