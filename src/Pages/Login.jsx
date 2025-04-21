import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { supabase } from "./../../supabase";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="w-1/2 bg-[#E3F1F4] hidden md:flex items-center justify-center">
        <img
          src="/assets/login-graphic.png" // Replace with actual image path
          alt="Login Visual"
          className="max-w-[80%] h-auto"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-1">Log in to Techtrend</h2>
          <p className="text-sm text-gray-600 mb-6">Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Email or Phone Number"
              {...register("email", { required: "Email is required" })}
              className="w-full border-b border-b-gray-300 outline-none py-2 placeholder-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full border-b border-b-gray-300 outline-none py-2 placeholder-gray-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-0 top-2 text-sm text-stone-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Log In
              </button>
              <a
                href="/forgot-password"
                className="text-xs text-red-500 hover:underline"
              >
                Forget Password?
              </a>
            </div>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center justify-center">
            <span className="text-gray-400 text-sm">OR</span>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
