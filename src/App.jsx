import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./UI/NotFound";
import CheckoutForm from "./Cart/CheckoutForm";
import Homepage from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import CheckOut from "./Cart/CheckOut";

const router = createBrowserRouter([
  {
    // path: "/",
    // element: <Layout />, // The main layout (optional)
    children: [
      { index: true, element: <Homepage /> }, // Home page at "/"
      { path: "dashboard", element: <Dashboard /> }, // About page at "/about"
      { path: "checkoutForm", element: <CheckoutForm /> },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/products/:brand/:id", element: <ProductDetails /> },
    ],
  },
  { path: "*", element: <NotFound /> }, // 404 page
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
