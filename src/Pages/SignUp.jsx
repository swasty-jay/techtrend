import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "./../../supabase"; // Adjust the import path as necessary
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  // Initialize form handling with react-hook-form

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Check your email for verification.");
      
      // Redirect to login or home page after successful signup
      setTimeout(() => {
        navigate("/login"); // Adjust the path as necessary
      }, 2000);
    }
  };

  
  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="w-1/2 bg-[#E3F1F4] hidden md:flex items-center justify-center">
        <img
          src="/assets/signup-graphic.png" // replace with actual image
          alt="Sign Up Visual"
          className="max-w-[80%] h-auto"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-10 bg-gray-50 pt-0">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-1">Create Account</h2>
          <p className="text-sm text-gray-600 mb-6">Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full border-b border-b-gray-300 outline-none py-2 placeholder-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full border-b border-b-gray-300 outline-none py-2 placeholder-gray-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-0 top-2 text-sm text-blue-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙉" : "🙈"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm password",
                  validate: (val) =>
                    val === watch("password") || "Passwords do not match",
                })}
                className="w-full border-b border-b-gray-300 outline-none py-2 placeholder-gray-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-0 top-2 text-sm text-blue-500"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? "🙉" : "🙈"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-red-500 hover:underline">
              Log In
            </a>  
          </p>
          <p className="text-sm text-gray-600 mt-2">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-red-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-red-500 hover:underline">
              Privacy Policy
            </a>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Signup;
