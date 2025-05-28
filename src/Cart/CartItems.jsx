// CartItems.jsx
import React from "react";

function CartItems({ cartItems }) {
  // If cartItems is empty, show a message
  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b pb-3"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1 ml-4">
            <p className="font-semibold">{item.name}</p>
            <p className="text-blue-600">GHS {item.price}</p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Qty: {item.quantity}</span>
            <span className="font-semibold">
              GHS {item.price * item.quantity}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
