import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./UI/NotFound";
import CheckoutForm from "./Cart/CheckoutForm";
import Homepage from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import CheckOut from "./Cart/CheckOut";
import AppLayout from "./UI/AppLayout";
import MotionWrapper from "./UI/MotionWrapper";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
// import Shop from "./Pages/Shop";
// import AdminDashboard from "./Features/Auth/Admin/AdminDashboard";
// import AdminLogin from "./Features/Auth/Admin/AdminLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <MotionWrapper>
            <Homepage />
          </MotionWrapper>
        ),
      },

      {
        path: "checkoutForm",
        element: (
          <MotionWrapper>
            <CheckoutForm />
          </MotionWrapper>
        ),
      },
      {
        path: "checkout",
        element: (
          <MotionWrapper>
            <CheckOut />
          </MotionWrapper>
        ),
      },
      {
        path: "products/:brand/:id",
        element: (
          <MotionWrapper>
            <ProductDetails />
          </MotionWrapper>
        ),
      },

      {
        path: "/login",
        element: (
          <MotionWrapper>
            <Login />
          </MotionWrapper>
        ),
      },
      {
        path: "/signup",
        element: (
          <MotionWrapper>
            <SignUp />
          </MotionWrapper>
        ),
      },
      {
        path: "/contact",
        element: (
          <MotionWrapper>
            <Contact />
          </MotionWrapper>
        ),
      },
      {
        path: "/about",
        element: (
          <MotionWrapper>
            <About />
          </MotionWrapper>
        ),
      },
      // {
      //   path: "/shop",
      //   element: (
      //     <MotionWrapper>
      //       <Shop />
      //     </MotionWrapper>
      //   ),
      // },
      // {
      //   path: "/Admindashboard",
      //   element: (
      //     <MotionWrapper>
      //       <AdminDashboard />
      //     </MotionWrapper>
      //   ),
      // },
      // {
      //   path: "/Adminlogin",
      //   element: (
      //     <MotionWrapper>
      //       <AdminLogin />
      //     </MotionWrapper>
      //   ),
      // },
      {
        path: "*",
        element: (
          <MotionWrapper>
            <NotFound />
          </MotionWrapper>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
