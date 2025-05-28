// // pages/admin/login.js
// import React, { useState, useEffect } from "react";
// import { Loader2, AlertCircle, Lock } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../../../../supabase";

// const AdminLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [checkingSession, setCheckingSession] = useState(true);

//   const navigate = useNavigate();

//   // React Hook Form setup
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // Check if user is already logged in
//   useEffect(() => {
//     const checkSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (session) {
//         navigate("/admin/dashboard");
//       } else {
//         setCheckingSession(false);
//       }
//     };

//     checkSession();
//   }, [navigate]);

//   // Login mutation
//   const loginMutation = useMutation({
//     mutationFn: async ({ email, password }) => {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;
//       return data;
//     },
//     onSuccess: () => {
//       router.push("/admin/dashboard");
//     },
//     onError: (error) => {
//       setError("Login failed: " + error.message);
//       console.error("Error during login:", error);
//     },
//   });

//   // Form submit handler
//   const onSubmit = (data) => {
//     loginMutation.mutate(data);
//   };

//   if (checkingSession) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//         <p className="ml-2">Checking authentication...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="bg-blue-600 py-4">
//           <h2 className="text-center text-white text-2xl font-bold">
//             Admin Login
//           </h2>
//         </div>

//         <div className="p-6">
//           {error && (
//             <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
//               <AlertCircle className="h-5 w-5 mr-2" />
//               <span>{error}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-medium mb-2"
//               >
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="admin@example.com"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block text-gray-700 font-medium mb-2"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 }`}
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters",
//                   },
//                 })}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loginMutation.isLoading}
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
//             >
//               {loginMutation.isLoading ? (
//                 <>
//                   <Loader2 className="animate-spin mr-2 h-5 w-5" />
//                   Logging in...
//                 </>
//               ) : (
//                 <>
//                   <Lock className="mr-2 h-5 w-5" />
//                   Login
//                 </>
//               )}
//             </button>
//           </form>

//           <div className="mt-4 text-center text-sm text-gray-600">
//             <p>Access restricted to authorized administrators only.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
