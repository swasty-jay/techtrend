import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { clearCart } from "../Store/cartSlice";
import Breadcrumb from "../UI/BreadCrumb";
import { supabase } from "./../../supabase";

const CheckoutForm = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [coupon, setCoupon] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const onSubmit = async (data) => {
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      ...data,
      payment_method: selectedPayment,
      coupon,
      total,
      items: cartItems,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("orders").insert([orderData]);

    if (error) {
      console.error("Error placing order:", error.message);
      alert("Failed to place order. Please try again.");
    } else {
      alert("Order Placed Successfully!");
      dispatch(clearCart());
      reset();
    }
  };

  return (
    <>
      <Breadcrumb
        paths={[
          { label: "Home", to: "/" },
          { label: "View Cart", to: "/checkout" },
          { label: "CheckOut", to: "/CheckoutForm" },
        ]}
      />

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Billing Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block mb-1 text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("first_name", {
                required: true,
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Full Name must contain only letters",
                },
              })}
              className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 "
            />
            {errors.first_name && (
              <p className="text-red-500">{errors.first_name.message}</p>
            )}

            <label className="block mb-1 text-sm font-medium">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("street", {
                required: true,
              })}
              className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            {errors.street && (
              <p className="text-red-500">{errors.street.message}</p>
            )}

            <label htmlFor="phone" className="block mb-1 text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numeric values are allowed",
                },
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
              })}
              className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:invalid:border-red-500"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}

            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:invalid:border-red-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <label className="block mb-1 text-sm font-medium">
              City/Town <span className="text-red-500">*</span>
            </label>
            <input
              {...register("city", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "City must contain only letters",
                },
              })}
              className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}

            <label className="inline-flex items-center border-gray-300 rounded border p-2 ">
              <input type="checkbox" className="mr-2 accent-red-500 " />
              Save this information for faster check-out next time
            </label>

            <button
              type="submit"
              className="mt-4 w-50 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <div className="space-y-4 border-b border-b-gray-300 pb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p>{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between font-semibold text-base">
              <p>Total:</p>
              <p>${total}</p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Payment Method</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={selectedPayment === "bank"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="accent-red-500"
                />
                Bank
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedPayment === "cod"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="accent-red-500"
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border p-2 rounded w-50 border-gray-400"
            />
            <button
              type="button"
              className="bg-red-500 text-white px-4 rounded "
            >
              Apply Coupon
            </button>
          </div>

          {/* <button
            type="submit"
            className="mt-4 w-40 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Place Order
          </button> */}
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
