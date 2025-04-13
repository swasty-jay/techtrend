import { useForm } from "react-hook-form";
import { supabase } from "./../../supabase";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created! Check your email to confirm.");
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src="/assets/signup-graphic.png" // Replace with your actual image path
          alt="E-commerce"
          className="max-w-full h-auto"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Create an account</h2>
          <p className="mb-6 text-sm text-gray-600">Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded"
            >
              Create Account
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={handleGoogleSignUp}
              className="w-full border p-3 rounded flex items-center justify-center gap-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Sign up with Google</span>
            </button>
          </div>

          <p className="text-sm text-center mt-6">
            Already have account?{" "}
            <a href="/login" className="text-blue-600 font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
