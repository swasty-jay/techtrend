// // This component handles the checkout process, including form submission,
// // payment processing, and order summary display.

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import { clearCart } from "../Store/cartSlice";
// import Breadcrumb from "../UI/BreadCrumb";
// import { supabase } from "./../../supabase";
// import toast from "react-hot-toast";
// import PaymentGateway from "./../Features/Payments/PaymentGateway";
// import { useNavigate } from "react-router-dom";

// const CheckoutForm = () => {
//   // Redux state and dispatch
//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Form handling with react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//     getValues,
//   } = useForm();

//   // Component state
//   const [selectedPayment, setSelectedPayment] = useState("paystack");
//   const [coupon, setCoupon] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Calculate order totals
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const shipping = 0;
//   const delivery = 0;
//   const total = subtotal + shipping + delivery;

//   /**
//    * Handle successful Paystack payment
//    * @param {Object} response - Payment response from Paystack
//    */
//   const handlePaystackSuccess = async (response) => {
//     try {
//       // Get form data
//       const formData = getValues();

//       // Create order data with payment information
//       const orderData = {
//         ...formData,
//         payment_method: "paystack",
//         payment_reference: response.reference,
//         payment_status: "paid",
//         coupon,
//         total,
//         items: cartItems,
//         created_at: new Date().toISOString(),
//       };

//       // Save order to database
//       const { error } = await supabase.from("orders").insert([orderData]);

//       if (error) {
//         console.error("Error saving order:", error);
//         toast.error("Failed to save order details. Please contact support.");
//       } else {
//         toast.success("Payment successful! Order placed.");
//         dispatch(clearCart());
//         reset();
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.");
//       console.error("Payment processing error:", error);
//     }
//   };

//   /**
//    * Handle Paystack payment cancellation
//    */
//   const handlePaystackCancel = () => {
//     toast.error("Payment cancelled");
//   };

//   /**
//    * Handle form submission for all payment methods
//    * @param {Object} data - Form data
//    */
//   const onSubmit = async (data) => {
//     // Validate cart has items
//     if (!cartItems.length) {
//       toast.error("Your cart is empty.");
//       return;
//     }

//     // Handle cash on delivery payment method
//     if (selectedPayment === "cod") {
//       toast.error("Payment on delivery is not available yet");
//       return;
//     }

//     // Process order for non-Paystack methods (currently none - reserved for future payment methods)
//     if (selectedPayment !== "paystack") {
//       const orderData = {
//         ...data,
//         payment_method: selectedPayment,
//         coupon,
//         total,
//         items: cartItems,
//         created_at: new Date().toISOString(),
//         payment_status: "awaiting_payment",
//       };

//       setIsProcessing(true);

//       try {
//         const { error } = await supabase.from("orders").insert([orderData]);

//         if (error) {
//           toast.error("Failed to place order. Please try again.");
//           console.error("Error placing order:", error);
//         } else {
//           toast.success("Order Placed Successfully!");
//           dispatch(clearCart());
//           reset();
//           // Redirect to homepage after a short delay
//           setTimeout(() => {
//             navigate("/");
//           }, 1500);
//         }
//       } catch (error) {
//         toast.error("An error occurred. Please try again.");
//         console.error("Order processing error:", error);
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//     // For Paystack, the PaymentGateway component handles the payment process
//   };

//   // Get email value for Paystack component
//   const email = watch("email", "");

//   return (
//     <>
//       {/* Breadcrumb navigation */}
//       <div className="w-full  py-2 mb-2">
//         <div className="max-w-6xl mx-auto px-6">
//           <Breadcrumb
//             paths={[
//               { label: "Home", to: "/" },
//               { label: "View Cart", to: "/checkout" },
//               { label: "CheckOut", to: "/CheckoutForm" },
//             ]}
//           />
//         </div>
//       </div>
//       <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* Billing Details Form */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4 uppercase">
//             Billing Details
//           </h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Full Name Field */}
//             <label className="block mb-1 text-sm font-medium">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("first_name", {
//                 required: "Full name is required",
//                 pattern: {
//                   value: /^[A-Za-z\s]+$/,
//                   message: "Full Name must contain only letters",
//                 },
//               })}
//               className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
//             />
//             {errors.first_name && (
//               <p className="text-red-500">{errors.first_name.message}</p>
//             )}

//             {/* Street Address Field */}
//             <label className="block mb-1 text-sm font-medium">
//               Street Address <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("street", {
//                 required: "Street address is required",
//               })}
//               className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
//             />
//             {errors.street && (
//               <p className="text-red-500">{errors.street.message}</p>
//             )}

//             {/* Phone Number Field */}
//             <label htmlFor="phone" className="block mb-1 text-sm font-medium">
//               Phone Number <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("phone", {
//                 required: "Phone number is required",
//                 pattern: {
//                   value: /^[0-9]+$/,
//                   message: "Only numeric values are allowed",
//                 },
//                 minLength: {
//                   value: 10,
//                   message: "Phone number must be at least 10 digits",
//                 },
//               })}
//               className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:invalid:border-red-500"
//             />
//             {errors.phone && (
//               <p className="text-red-500">{errors.phone.message}</p>
//             )}

//             {/* Email Address Field */}
//             <label htmlFor="email" className="block mb-1 text-sm font-medium">
//               Email Address <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Enter a valid email address",
//                 },
//               })}
//               type="email"
//               className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:invalid:border-red-500"
//             />
//             {errors.email && (
//               <p className="text-red-500">{errors.email.message}</p>
//             )}

//             {/* City/Town Field */}
//             <label className="block mb-1 text-sm font-medium">
//               City/Town <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("city", {
//                 required: "City is required",
//                 pattern: {
//                   value: /^[a-zA-Z\s]*$/,
//                   message: "City must contain only letters",
//                 },
//               })}
//               className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
//             />
//             {errors.city && (
//               <p className="text-red-500">{errors.city.message}</p>
//             )}

//             {/* Save Information Checkbox */}
//             <label className="inline-flex items-center border-gray-300 rounded border p-2">
//               <input type="checkbox" className="mr-2 accent-red-500" />
//               Save this information for faster check-out next time
//             </label>

//             {/* Show standard submit button only for non-Paystack payment methods */}
//             {selectedPayment !== "paystack" && (
//               <button
//                 type="submit"
//                 disabled={isProcessing}
//                 className={`mt-4 w-50 bg-red-500 text-white py-2 rounded transition ${
//                   isProcessing
//                     ? "opacity-70 cursor-not-allowed"
//                     : "hover:bg-red-600"
//                 }`}
//               >
//                 {isProcessing ? "Processing..." : "Place Order"}
//               </button>
//             )}

//             {/* Show Paystack button for Paystack payment method */}
//             {selectedPayment === "paystack" && email && (
//               <div className="mt-4">
//                 <PaymentGateway
//                   isProcessing={isProcessing}
//                   setIsProcessing={setIsProcessing}
//                   amount={total}
//                   email={email}
//                   metadata={{
//                     custom_fields: [
//                       {
//                         display_name: "Customer Name",
//                         variable_name: "customer_name",
//                         value: watch("first_name", ""),
//                       },
//                     ],
//                   }}
//                   onSuccess={handlePaystackSuccess}
//                   onCancel={handlePaystackCancel}
//                 >
//                   Pay GHS {total} Now
//                 </PaymentGateway>
//               </div>
//             )}
//           </form>
//         </div>

//         {/* Order Summary Section */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4 uppercase">Your Order</h2>

//           {/* Cart Items */}
//           <div className="space-y-4 border-b border-b-gray-300 pb-4">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex justify-between items-center">
//                 <div className="flex gap-3 items-center">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">
//                       Qty: {item.quantity}
//                     </p>
//                   </div>
//                 </div>
//                 <p>GHS {item.price * item.quantity}</p>
//               </div>
//             ))}
//           </div>

//           {/* Order Totals */}
//           <div className="mt-4 space-y-2 text-sm text-gray-700">
//             <div className="flex justify-between">
//               <p>Subtotal:</p>
//               <p>GHS {subtotal}</p>
//             </div>
//             <div className="flex justify-between">
//               <p>Delivery:</p>
//               <p>GHS {delivery}</p>
//             </div>
//             <div className="flex justify-between">
//               <p>Shipping:</p>
//               <p>Free</p>
//             </div>
//             <div className="flex justify-between font-semibold text-base">
//               <p>Total:</p>
//               <p>GHS {total}</p>
//             </div>
//           </div>

//           {/* Payment Options - Only PayStack and COD */}
//           <div className="mt-6">
//             <p className="font-semibold mb-2">Payment Method</p>
//             <div className="flex flex-col gap-2">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="paystack"
//                   checked={selectedPayment === "paystack"}
//                   onChange={(e) => setSelectedPayment(e.target.value)}
//                   className="accent-red-500"
//                 />
//                 Pay Now
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="cod"
//                   checked={selectedPayment === "cod"}
//                   onChange={(e) => setSelectedPayment(e.target.value)}
//                   className="accent-red-500"
//                 />
//                 Cash on Delivery
//               </label>
//             </div>
//           </div>

//           {/* Coupon Section */}
//           <div className="mt-4 flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter Coupon Code"
//               value={coupon}
//               onChange={(e) => setCoupon(e.target.value)}
//               className="border p-2 rounded w-50 border-gray-400"
//             />
//             <button
//               type="button"
//               className="bg-red-500 text-white px-4 rounded"
//               onClick={() => toast.error("Coupon not available yet")}
//             >
//               Apply Coupon
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CheckoutForm;

// This component handles the checkout process, including form submission,
// payment processing, and order summary display.

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { clearCart } from "../Store/cartSlice";
import Breadcrumb from "../UI/BreadCrumb";
import { supabase } from "./../../supabase";
import toast from "react-hot-toast";
import PaymentGateway from "./../Features/Payments/PaymentGateway";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  // React Router navigation
  const navigate = useNavigate();

  // Redux state and dispatch
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm();

  // Component state
  const [selectedPayment, setSelectedPayment] = useState("paystack");
  const [coupon, setCoupon] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate order totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const delivery = 0;
  const total = subtotal + shipping + delivery;

  /**
   * Handle successful Paystack payment
   * @param {Object} response - Payment response from Paystack
   */
  const handlePaystackSuccess = async (response) => {
    try {
      // Get form data
      const formData = getValues();

      // Create order data with payment information
      const orderData = {
        ...formData,
        payment_method: "paystack",
        payment_reference: response.reference,
        payment_status: "paid",
        coupon,
        total,
        items: cartItems,
        created_at: new Date().toISOString(),
      };

      // Save order to database
      const { error } = await supabase.from("orders").insert([orderData]);

      if (error) {
        console.error("Error saving order:", error);
        toast.error("Failed to save order details. Please contact support.");
      } else {
        toast.success("Payment successful!");
        dispatch(clearCart());
        reset();

        // Store order information in sessionStorage for the thank you page
        sessionStorage.setItem(
          "orderDetails",
          JSON.stringify({
            orderId: response.reference,
            total: total,
            date: new Date().toLocaleDateString(),
            paymentMethod: "PayStack",
          })
        );

        // Redirect to thank you page
        navigate("/thank-you");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Payment processing error:", error);
    }
  };

  /**
   * Handle Paystack payment cancellation
   */
  const handlePaystackCancel = () => {
    toast.error("Payment cancelled");
  };

  /**
   * Handle form submission for all payment methods
   * @param {Object} data - Form data
   */
  const onSubmit = async (data) => {
    // Validate cart has items
    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      return;
    }

    // Handle cash on delivery payment method
    if (selectedPayment === "cod") {
      toast.error("Payment on delivery is not available yet");
      return;
    }

    // Process order for non-Paystack methods (currently none - reserved for future payment methods)
    if (selectedPayment !== "paystack") {
      const orderData = {
        ...data,
        payment_method: selectedPayment,
        coupon,
        total,
        items: cartItems,
        created_at: new Date().toISOString(),
        payment_status: "awaiting_payment",
      };

      setIsProcessing(true);

      try {
        const { error } = await supabase.from("orders").insert([orderData]);

        if (error) {
          toast.error("Failed to place order. Please try again.");
          console.error("Error placing order:", error);
        } else {
          // Store order information in sessionStorage for the thank you page
          sessionStorage.setItem(
            "orderDetails",
            JSON.stringify({
              orderId: Math.random().toString(36).substring(2, 15),
              total: total,
              date: new Date().toLocaleDateString(),
              paymentMethod: "Cash on Delivery",
            })
          );

          // Redirect to thank you page
          navigate("/thank-you");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error("Order processing error:", error);
      } finally {
        setIsProcessing(false);
      }
    }
    // For Paystack, the PaymentGateway component handles the payment process
  };

  // Get email value for Paystack component
  const email = watch("email", "");

  return (
    <>
      {/* Breadcrumb navigation */}
      <div className="w-full bg-gray-100 py-4 mb-6">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb
            paths={[
              { label: "Home", to: "/" },
              { label: "View Cart", to: "/checkout" },
              { label: "CheckOut", to: "/CheckoutForm" },
            ]}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Billing Details Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4 uppercase">
            Billing Details
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name Field */}
            <label className="block mb-1 text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("first_name", {
                required: "Full name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Full Name must contain only letters",
                },
              })}
              className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            {errors.first_name && (
              <p className="text-red-500">{errors.first_name.message}</p>
            )}

            {/* Street Address Field */}
            <label className="block mb-1 text-sm font-medium">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("street", {
                required: "Street address is required",
              })}
              className="w-full p-2 rounded border-gray-200 border bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            {errors.street && (
              <p className="text-red-500">{errors.street.message}</p>
            )}

            {/* Phone Number Field */}
            <label htmlFor="phone" className="block mb-1 text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phone", {
                required: "Phone number is required",
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

            {/* Email Address Field */}
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
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

            {/* City/Town Field */}
            <label className="block mb-1 text-sm font-medium">
              City/Town <span className="text-red-500">*</span>
            </label>
            <input
              {...register("city", {
                required: "City is required",
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

            {/* Save Information Checkbox */}
            <label className="inline-flex items-center border-gray-300 rounded border p-2">
              <input type="checkbox" className="mr-2 accent-red-500" />
              Save this information for faster check-out next time
            </label>

            {/* Show standard submit button only for non-Paystack payment methods */}
            {selectedPayment !== "paystack" && (
              <button
                type="submit"
                disabled={isProcessing}
                className={`mt-4 w-50 bg-red-500 text-white py-2 rounded transition ${
                  isProcessing
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-red-600"
                }`}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            )}

            {/* Show Paystack button for Paystack payment method */}
            {selectedPayment === "paystack" && email && (
              <div className="mt-4">
                <PaymentGateway
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                  amount={total}
                  email={email}
                  metadata={{
                    custom_fields: [
                      {
                        display_name: "Customer Name",
                        variable_name: "customer_name",
                        value: watch("first_name", ""),
                      },
                    ],
                  }}
                  onSuccess={handlePaystackSuccess}
                  onCancel={handlePaystackCancel}
                >
                  Pay GHS {total} Now
                </PaymentGateway>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 uppercase">Your Order</h2>

          {/* Cart Items */}
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
                <p>GHS {item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Order Totals */}
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>GHS {subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery:</p>
              <p>GHS {delivery}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between font-semibold text-base">
              <p>Total:</p>
              <p>GHS {total}</p>
            </div>
          </div>

          {/* Payment Options - Only PayStack and COD */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Payment Method</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="paystack"
                  checked={selectedPayment === "paystack"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="accent-red-500"
                />
                Pay with PayStack
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

          {/* Coupon Section */}
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
              className="bg-red-500 text-white px-4 rounded"
              onClick={() => toast.error("Coupon not available yet")}
            >
              Apply Coupon
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
