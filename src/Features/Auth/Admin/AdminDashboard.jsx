// // AdminDashboard.js
// import React, { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import {
//   Loader2,
//   Plus,
//   Edit,
//   Trash2,
//   Save,
//   X,
//   Image,
//   Package,
//   AlertCircle,
// } from "lucide-react";
// import { supabase } from "../../../../supabase";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [session, setSession] = useState(null);
//   const navigate = useNavigate();

//   const queryClient = useQueryClient();

//   // React Hook Form setup
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       title: "",
//       price: "",
//       description: "",
//       category: "",
//       image_url: "",
//       rating: "0",
//       stock: "0",
//     },
//   });

//   // Check authentication on component mount
//   useEffect(() => {
//     const checkSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setSession(session);

//       // If no session or not an admin, redirect to login
//       if (!session) {
//         navigate("/admin/login");
//       }
//     };

//     checkSession();
//   }, [navigate]);

//   // Fetch products using React Query
//   const {
//     data: products,
//     isLoading,
//     error: fetchError,
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("products")
//         .select("*")
//         .order("id", { ascending: true });

//       if (error) throw error;
//       return data || [];
//     },
//     enabled: !!session, // Only run query when authenticated
//   });

//   // Add product mutation
//   const addProductMutation = useMutation({
//     mutationFn: async (newProduct) => {
//       const { data, error } = await supabase
//         .from("products")
//         .insert([newProduct])
//         .select();

//       if (error) throw error;
//       return data[0];
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//       resetFormState();
//     },
//   });

//   // Update product mutation
//   const updateProductMutation = useMutation({
//     mutationFn: async ({ id, updatedProduct }) => {
//       const { data, error } = await supabase
//         .from("products")
//         .update(updatedProduct)
//         .eq("id", id)
//         .select();

//       if (error) throw error;
//       return data[0];
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//       resetFormState();
//     },
//   });

//   // Delete product mutation
//   const deleteProductMutation = useMutation({
//     mutationFn: async (id) => {
//       const { error } = await supabase.from("products").delete().eq("id", id);

//       if (error) throw error;
//       return id;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//     },
//   });

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Upload image to Supabase Storage
//   const uploadImage = async () => {
//     if (!imageFile) return null;

//     try {
//       setIsUploading(true);
//       const fileExt = imageFile.name.split(".").pop();
//       const fileName = `${Date.now()}.${fileExt}`;
//       const filePath = `product-images/${fileName}`;

//       const { error: uploadError } = await supabase.storage
//         .from("product-images")
//         .upload(filePath, imageFile);

//       if (uploadError) throw uploadError;

//       // Get public URL
//       const { data } = supabase.storage
//         .from("product-images")
//         .getPublicUrl(filePath);
//       return data.publicUrl;
//     } catch (err) {
//       console.error("Error uploading image:", err);
//       return null;
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // Submit form handler for both add and update
//   const onSubmit = async (formData) => {
//     try {
//       // Upload image if selected
//       let imageUrl = formData.image_url;
//       if (imageFile) {
//         imageUrl = await uploadImage();
//         if (!imageUrl && !formData.image_url) {
//           // If upload failed and no existing URL
//           alert(
//             "Image upload failed. Please try again or provide an image URL."
//           );
//           return;
//         }
//       }

//       // Prepare product data
//       const productData = {
//         ...formData,
//         price: parseFloat(formData.price),
//         rating: parseFloat(formData.rating),
//         stock: parseInt(formData.stock),
//         image_url: imageUrl || formData.image_url,
//       };

//       // Add or update based on editing state
//       if (editingProductId) {
//         await updateProductMutation.mutateAsync({
//           id: editingProductId,
//           updatedProduct: productData,
//         });
//       } else {
//         await addProductMutation.mutateAsync(productData);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert(
//         `Failed to ${editingProductId ? "update" : "add"} product: ${
//           error.message
//         }`
//       );
//     }
//   };

//   // Delete product handler
//   const deleteProduct = async (id) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await deleteProductMutation.mutateAsync(id);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert(`Failed to delete product: ${error.message}`);
//     }
//   };

//   // Edit product - load its data into form
//   const startEditing = (product) => {
//     // Reset form with product data
//     reset({
//       title: product.title,
//       price: product.price.toString(),
//       description: product.description,
//       category: product.category,
//       image_url: product.image_url,
//       rating: product.rating.toString(),
//       stock: product.stock.toString(),
//     });

//     setImagePreview(product.image_url);
//     setEditingProductId(product.id);
//     setIsAdding(false);
//   };

//   // Reset form state
//   const resetFormState = () => {
//     reset({
//       title: "",
//       price: "",
//       description: "",
//       category: "",
//       image_url: "",
//       rating: "0",
//       stock: "0",
//     });
//     setImageFile(null);
//     setImagePreview(null);
//     setIsAdding(false);
//     setEditingProductId(null);
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/admin/login");
//   };

//   // Start adding new product
//   const startAdding = () => {
//     resetFormState();
//     setIsAdding(true);
//   };

//   if (!session) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//         <p className="ml-2">Checking authentication...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <div>
//           <button
//             onClick={startAdding}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center mr-2"
//           >
//             <Plus className="mr-1 h-5 w-5" /> Add Product
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {(fetchError ||
//         addProductMutation.error ||
//         updateProductMutation.error ||
//         deleteProductMutation.error) && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative flex items-center">
//           <AlertCircle className="h-5 w-5 mr-2" />
//           <span className="block sm:inline">
//             {fetchError?.message ||
//               addProductMutation.error?.message ||
//               updateProductMutation.error?.message ||
//               deleteProductMutation.error?.message}
//           </span>
//           <button
//             className="absolute top-0 bottom-0 right-0 px-4 py-3"
//             onClick={() => queryClient.resetQueries(["products"])}
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//       )}

//       {/* Add/Edit Product Form */}
//       {(isAdding || editingProductId) && (
//         <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//           <h2 className="text-xl font-semibold mb-4">
//             {editingProductId ? "Edit Product" : "Add New Product"}
//           </h2>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     className={`w-full p-2 border rounded-md ${
//                       errors.title ? "border-red-500" : ""
//                     }`}
//                     {...register("title", {
//                       required: "Title is required",
//                       minLength: {
//                         value: 3,
//                         message: "Title must be at least 3 characters",
//                       },
//                     })}
//                   />
//                   {errors.title && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.title.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Price ($)
//                   </label>
//                   <input
//                     type="number"
//                     className={`w-full p-2 border rounded-md ${
//                       errors.price ? "border-red-500" : ""
//                     }`}
//                     step="0.01"
//                     min="0"
//                     {...register("price", {
//                       required: "Price is required",
//                       min: { value: 0, message: "Price must be positive" },
//                       pattern: {
//                         value: /^\d+(\.\d{1,2})?$/,
//                         message: "Enter a valid price",
//                       },
//                     })}
//                   />
//                   {errors.price && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.price.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     className={`w-full p-2 border rounded-md ${
//                       errors.category ? "border-red-500" : ""
//                     }`}
//                     {...register("category", {
//                       required: "Category is required",
//                     })}
//                   />
//                   {errors.category && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.category.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Rating (0-5)
//                   </label>
//                   <input
//                     type="number"
//                     className={`w-full p-2 border rounded-md ${
//                       errors.rating ? "border-red-500" : ""
//                     }`}
//                     step="0.1"
//                     min="0"
//                     max="5"
//                     {...register("rating", {
//                       required: "Rating is required",
//                       min: { value: 0, message: "Rating must be at least 0" },
//                       max: { value: 5, message: "Rating must be at most 5" },
//                     })}
//                   />
//                   {errors.rating && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.rating.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Stock
//                   </label>
//                   <input
//                     type="number"
//                     className={`w-full p-2 border rounded-md ${
//                       errors.stock ? "border-red-500" : ""
//                     }`}
//                     min="0"
//                     {...register("stock", {
//                       required: "Stock is required",
//                       min: { value: 0, message: "Stock must be at least 0" },
//                       pattern: {
//                         value: /^\d+$/,
//                         message: "Stock must be a whole number",
//                       },
//                     })}
//                   />
//                   {errors.stock && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.stock.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Description
//                   </label>
//                   <textarea
//                     className={`w-full p-2 border rounded-md h-32 ${
//                       errors.description ? "border-red-500" : ""
//                     }`}
//                     {...register("description", {
//                       required: "Description is required",
//                       minLength: {
//                         value: 10,
//                         message: "Description must be at least 10 characters",
//                       },
//                     })}
//                   />
//                   {errors.description && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.description.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Image URL (optional)
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded-md"
//                     placeholder="https://example.com/image.jpg"
//                     {...register("image_url")}
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Enter URL directly or upload an image below
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Upload Image
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="w-full p-2 border rounded-md"
//                   />
//                 </div>

//                 {imagePreview && (
//                   <div className="mt-2">
//                     <p className="text-sm font-medium mb-1">Image Preview:</p>
//                     <div className="border rounded-md p-2 w-32 h-32 flex items-center justify-center overflow-hidden">
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="max-h-full max-w-full object-contain"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end space-x-2">
//               <button
//                 type="button"
//                 onClick={resetFormState}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
//                 disabled={
//                   isUploading ||
//                   addProductMutation.isLoading ||
//                   updateProductMutation.isLoading
//                 }
//               >
//                 {isUploading ||
//                 addProductMutation.isLoading ||
//                 updateProductMutation.isLoading ? (
//                   <>
//                     <Loader2 className="mr-1 h-5 w-5 animate-spin" />
//                     {isUploading ? "Uploading..." : "Saving..."}
//                   </>
//                 ) : (
//                   <>
//                     <Save className="mr-1 h-5 w-5" />
//                     {editingProductId ? "Update" : "Save"}
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="p-4 bg-gray-50 border-b">
//           <h2 className="text-xl font-semibold flex items-center">
//             <Package className="mr-2 h-5 w-5" /> Products
//           </h2>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center p-8">
//             <Loader2 className="h-8 w-8 animate-spin" />
//             <p className="ml-2">Loading products...</p>
//           </div>
//         ) : !products || products.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             No products found. Add your first product!
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Image
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Title
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Rating
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {products.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="w-12 h-12 flex items-center justify-center overflow-hidden border rounded">
//                         {product.image_url ? (
//                           <img
//                             src={product.image_url}
//                             alt={product.title}
//                             className="max-h-full max-w-full object-contain"
//                           />
//                         ) : (
//                           <Image className="h-6 w-6 text-gray-400" />
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {product.title}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         ${product.price.toFixed(2)}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {product.category}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {product.stock}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {product.rating.toFixed(1)}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => startEditing(product)}
//                         className="text-indigo-600 hover:text-indigo-900 mr-3"
//                         disabled={deleteProductMutation.isLoading}
//                       >
//                         <Edit className="h-5 w-5" />
//                       </button>
//                       <button
//                         onClick={() => deleteProduct(product.id)}
//                         className="text-red-600 hover:text-red-900"
//                         disabled={deleteProductMutation.isLoading}
//                       >
//                         {deleteProductMutation.variables === product.id &&
//                         deleteProductMutation.isLoading ? (
//                           <Loader2 className="h-5 w-5 animate-spin" />
//                         ) : (
//                           <Trash2 className="h-5 w-5" />
//                         )}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
