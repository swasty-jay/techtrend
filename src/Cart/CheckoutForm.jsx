import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import { supabase } from "../../supabase"; // Import Supabase client

function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // React Hook Form hook
  const [cartTotal] = useState(250.0); // Example total price

  const onSubmit = async (data) => {
    try {
      // Save the checkout form data to Supabase
      const { error } = await supabase.from("checkout").insert([
        {
          name: data.name,
          email: data.email,
          address: data.address,
          phone: data.phone,
          total_price: cartTotal,
        },
      ]);

      if (error) {
        console.error("Error inserting data: ", error.message);
      } else {
        console.log("Checkout data saved successfully!");
        // Proceed to payment or success screen here
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: "Full name is required" })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Shipping Address"
          {...register("address", { required: "Address is required" })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}

        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phone", { required: "Phone number is required" })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">
            Order Total: GHS {cartTotal.toFixed(2)}
          </h3>
        </div>

        <div className="mt-6">
          <Button type="submit" variant="success" className="w-full">
            Proceed to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
