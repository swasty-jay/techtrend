import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./UI/NotFound";
import CheckoutForm from "./Cart/CheckoutForm";
// import CartItems from "./Cart/CartItems";

const router = createBrowserRouter([
  {
    // path: "/",
    // element: <Layout />, // The main layout (optional)
    children: [
      { index: true, element: <Home /> }, // Home page at "/"
      { path: "dashboard", element: <Dashboard /> }, // About page at "/about"
      { path: "checkoutForm", element: <CheckoutForm /> },
    ],
  },
  { path: "*", element: <NotFound /> }, // 404 page
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
